import React from 'react';
import './App.css';
import NoteEaseContainer from './components/NoteEaseContainer';

// PUBLIC_INTERFACE
/**
 * Root application component.
 * Renders the main NoteEase container.
 */
function App() {
  return (
    <div className="app">
      <NoteEaseContainer />
    </div>
  );
}

export default App;