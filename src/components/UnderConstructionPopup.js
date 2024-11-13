import React from 'react';

import '../App.css';

const UnderConstructionPopup = ({ onClose }) => (
    <div className="popup-overlay">
      <div className="popup">
        <p>Esta funcionalidad está en construcción</p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );

export default UnderConstructionPopup;
