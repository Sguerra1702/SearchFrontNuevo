import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoResultsPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="popup">
      <div className="popup-content">
        <p>No se encontraron resultados para los parámetros especificados.</p>
        <button onClick={() => navigate('/')}>Ok</button>
      </div>
    </div>
  );
};

export default NoResultsPopup;
