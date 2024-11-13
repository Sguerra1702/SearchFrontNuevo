import React from 'react';

import '../App.css';

const SearchingPopup = () => (
    <div className="popup-overlay">
      <div className="popup">
        <p>Buscando en la base de datos...</p>
        <div className="loader"></div>
      </div>
    </div>
  );

export default SearchingPopup;
