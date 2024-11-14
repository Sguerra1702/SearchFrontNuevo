import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchingPopup from './SearchingPopup';

describe('SearchingPopup Component', () => {
  test('renders the searching message and loader', () => {
    const { container } = render(<SearchingPopup />);

    // Verificar que el mensaje de búsqueda está presente
    expect(screen.getByText('Buscando en la base de datos...')).toBeInTheDocument();

    // Verificar que el loader se renderiza correctamente usando querySelector
    const loaderElement = container.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
  });
});

