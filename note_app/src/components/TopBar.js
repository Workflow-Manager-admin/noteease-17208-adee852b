// PUBLIC_INTERFACE
import React from 'react';
import './TopBar.css';

/**
 * TopBar component for NoteEase.
 * Displays the application title, a search bar, and a "New Note" button.
 * @param {object} props - Component props.
 * @param {function} props.onAddNote - Callback function to add a new note.
 * @param {string} props.searchTerm - Current value of the search term.
 * @param {function} props.onSearchChange - Callback function to update the search term.
 */
function TopBar({ onAddNote, searchTerm, onSearchChange }) {
  return (
    <header className="topbar-container">
      <div className="topbar-logo">
        NoteEase
      </div>
      <div className="topbar-search">
        <input
          type="search"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className="btn topbar-add-btn" onClick={onAddNote}>
        New Note
      </button>
    </header>
  );
}

export default TopBar;
