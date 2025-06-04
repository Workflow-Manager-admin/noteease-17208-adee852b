// PUBLIC_INTERFACE
import React, { useState, useEffect } from 'react';
import './NoteContent.css';

/**
 * NoteContent component for NoteEase.
 * Displays the content of the selected note and allows editing.
 * @param {object} props - Component props.
 * @param {object|null} props.note - The active note object, or null if no note is selected.
 * @param {function} props.onUpdateNote - Callback function to update the note.
 * @param {function} props.onDeleteNote - Callback function to delete the note.
 */
function NoteContent({ note, onUpdateNote, onDeleteNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category || '');
      setIsEditing(false); // Reset editing state when note changes
    } else {
      // Clear fields if no note is selected
      setTitle('');
      setContent('');
      setCategory('');
      setIsEditing(false);
    }
  }, [note]);

  // PUBLIC_INTERFACE
  /**
   * Handles saving the edited note.
   */
  const handleSave = () => {
    if (note) {
      onUpdateNote({ ...note, title, content, category });
      setIsEditing(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles deleting the current note.
   */
  const handleDelete = () => {
    if (note && window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      onDeleteNote(note.id);
    }
  };

  if (!note) {
    return (
      <div className="note-content-container note-content-empty">
        <h2>Select a note to view or edit, or create a new one.</h2>
      </div>
    );
  }

  return (
    <main className="note-content-container">
      {!isEditing ? (
        <>
          <div className="note-header">
            <h2 className="note-title-display">{note.title || 'Untitled'}</h2>
            <div className="note-actions">
              <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
          {note.category && <p className="note-category-display">Category: <span>{note.category}</span></p>}
          <div className="note-body-display">
            {note.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph || <>&nbsp;</>}</p> // Render empty paragraphs to maintain spacing
            ))}
            {note.content === '' && <p className="note-content-placeholder">This note is empty.</p>}
          </div>
          <small className="note-last-modified">
            Last modified: {new Date(note.lastModified).toLocaleString()}
          </small>
        </>
      ) : (
        <div className="note-edit-form">
          <div className="form-group">
            <label htmlFor="note-title-edit">Title</label>
            <input
              id="note-title-edit"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content-edit">Content</label>
            <textarea
              id="note-content-edit"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your note here..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-category-edit">Category</label>
            <input
              id="note-category-edit"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Note Category (optional)"
            />
          </div>
          <div className="note-edit-actions">
            <button className="btn" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default NoteContent;
