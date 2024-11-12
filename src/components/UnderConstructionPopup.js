import React from 'react';

const UnderConstructionPopup = ({ onClose }) => (
  <div className="popup">
    <div className="popup-content">
      <p>Esta funcionalidad está en construcción y no se puede usar actualmente.</p>
      <button onClick={onClose}>Ok</button>
    </div>
  </div>
);

export default UnderConstructionPopup;
