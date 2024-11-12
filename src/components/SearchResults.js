import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const { state } = useLocation();
  const results = state ? state.results : [];
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Nueva búsqueda</button>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {results.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
