// PUBLIC_INTERFACE
import React from 'react';
import './Sidebar.css';

/**
 * Sidebar component for NoteEase.
 * Displays a list of notes, allowing selection and quick deletion.
 * @param {object} props - Component props.
 * @param {Array<object>} props.notes - Array of note objects to display.
 * @param {string|null} props.activeNoteId - ID of the currently active note.
 * @param {function} props.onSelectNote - Callback function when a note is selected.
 * @param {function} props.onDeleteNote - Callback function to delete a note.
 */
function Sidebar({ notes, activeNoteId, onSelectNote, onDeleteNote }) {
  
  const getSnippet = (content, maxLength = 60) => {
    if (!content) return 'No content';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <aside className="sidebar-container">
      {notes.length === 0 && (
        <div className="sidebar-empty">
          No notes yet. Create one!
        </div>
      )}
      <ul className="sidebar-list">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`sidebar-item ${note.id === activeNoteId ? 'active' : ''}`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="sidebar-item-content">
              <h3 className="sidebar-item-title">{note.title || 'Untitled'}</h3>
              <p className="sidebar-item-snippet">{getSnippet(note.content)}</p>
              {note.category && <small className="sidebar-item-category">Category: {note.category}</small>}
            </div>
            <button
              className="icon-btn sidebar-item-delete"
              onClick={(e) => {
                e.stopPropagation(); // Prevent li onClick from firing
                onDeleteNote(note.id);
              }}
              title="Delete note"
            >
              &#x1F5D1; {/* Trash can icon */}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
