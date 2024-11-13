import React, { useState } from 'react';
import SearchingPopup from './SearchingPopup';
import UnderConstructionPopup from './UnderConstructionPopup';
import { searchByParam } from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MainSearch = () => {
  const [searchParam, setSearchParam] = useState('');
  const [searchType, setSearchType] = useState('');
  const [showSearchingPopup, setShowSearchingPopup] = useState(false);
  const [showUnderConstructionPopup, setShowUnderConstructionPopup] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (['id', 'title', 'author', 'category', 'isbn'].includes(searchType)) {
      setShowSearchingPopup(true);

      setTimeout(async () => {
        const results = await searchByParam(searchParam, searchType);
        setShowSearchingPopup(false);

        if (results.length > 0) {
          navigate('/results', { state: { results } });
        } else {
          navigate('/no-results');
        }
      }, 3000);
    }
  };

  // Manejador de cambios en el menú desplegable
  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setSearchType(selectedType);

    // Mostrar pop-up de "En construcción" si selecciona "Código QR"
    if (selectedType === 'code') {
      setShowUnderConstructionPopup(true);
    }
  };

  // Cerrar pop-up de "En construcción" y restablecer el valor del menú
  const handleUnderConstructionClose = () => {
    setShowUnderConstructionPopup(false);
    setSearchType(''); // Reset al valor por defecto
  };

  return (
    <div>
      <h1>Búsqueda de libros</h1>
      <select className="search-select" value={searchType} onChange={handleSelectChange}>
        <option value="">Seleccione un parámetro</option>
        <option value="id">ID</option>
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="category">Categoría</option>
        <option value="isbn">ISBN</option>
        <option value="keywords">Palabras Clave</option>
        <option value="code">Código QR</option>
      </select>
      <input
        type="text"
        className="search-input"
        placeholder="Ingresa el parámetro de búsqueda"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Buscar</button>

      {showSearchingPopup && <SearchingPopup />}
      {showUnderConstructionPopup && (
        <UnderConstructionPopup onClose={handleUnderConstructionClose} />
      )}
    </div>
  );
};

export default MainSearch;
