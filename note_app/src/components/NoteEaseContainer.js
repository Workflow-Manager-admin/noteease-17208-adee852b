// PUBLIC_INTERFACE
import React, { useState, useEffect } from 'react';
import './NoteEaseContainer.css';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import NoteContent from './NoteContent';

/**
 * Main container for the NoteEase application.
 * Manages notes, active note selection, search, and overall layout.
 */
function NoteEaseContainer() {
  const [notes, setNotes] = useState(() => {
    // Lazy initializer for notes from localStorage or default
    const savedNotes = localStorage.getItem('noteease-notes');
    if (savedNotes) {
      return JSON.parse(savedNotes);
    }
    return [
      { id: crypto.randomUUID(), title: 'Welcome to NoteEase!', content: 'This is a sample note. Feel free to edit or delete it.', category: 'Getting Started', lastModified: Date.now() },
      { id: crypto.randomUUID(), title: 'My Second Note', content: 'You can create new notes using the button in the top bar.', category: 'Tutorial', lastModified: Date.now() - 100000 },
    ];
  });

  const [activeNoteId, setActiveNoteId] = useState(notes.length > 0 ? notes[0].id : null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('noteease-notes', JSON.stringify(notes));
  }, [notes]);

  // PUBLIC_INTERFACE
  /**
   * Adds a new empty note and sets it as active.
   */
  const handleAddNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: 'New Note',
      content: '',
      category: '',
      lastModified: Date.now(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
    setSearchTerm(''); // Clear search to show the new note
  };

  // PUBLIC_INTERFACE
  /**
   * Updates an existing note.
   * @param {object} updatedNote - The note object with updated fields.
   */
  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? { ...updatedNote, lastModified: Date.now() } : note
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Deletes a note by its ID.
   * @param {string} noteId - The ID of the note to delete.
   */
  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (activeNoteId === noteId) {
      const remainingNotes = notes.filter(note => note.id !== noteId);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
  };

  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.category && note.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => b.lastModified - a.lastModified);

  const activeNote = filteredNotes.find(note => note.id === activeNoteId) || (filteredNotes.length > 0 ? filteredNotes[0] : null);
  
  // Effect to update activeNoteId if the current activeNote is filtered out
  useEffect(() => {
    if (notes.length > 0 && !notes.find(note => note.id === activeNoteId)) {
        const sortedVisibleNotes = notes
            .filter(note => 
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (note.category && note.category.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .sort((a, b) => b.lastModified - a.lastModified);
        setActiveNoteId(sortedVisibleNotes.length > 0 ? sortedVisibleNotes[0].id : null);
    } else if (notes.length === 0) {
        setActiveNoteId(null);
    }
  }, [searchTerm, notes, activeNoteId]);


  return (
    <div className="noteease-container">
      <TopBar 
        onAddNote={handleAddNote} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      <div className="noteease-main-content">
        <Sidebar
          notes={filteredNotes}
          activeNoteId={activeNote ? activeNote.id : null}
          onSelectNote={setActiveNoteId}
          onDeleteNote={handleDeleteNote}
        />
        <NoteContent 
          note={activeNote} 
          onUpdateNote={handleUpdateNote} 
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  );
}

export default NoteEaseContainer;
