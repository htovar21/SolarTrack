import React from 'react';
import './SuggestionBox.css';

function SuggestionBox({ suggestion }) {
  return (
    <div className="suggestion-box">
      <span className="suggestion-title">Sugerencia del Día</span>
      <div className="suggestion-text">{suggestion}</div>
    </div>
  );
}

export default SuggestionBox; 