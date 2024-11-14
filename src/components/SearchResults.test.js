import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react';
import SearchResults from './SearchResults';

// Mockear useNavigate y useLocation a nivel global
const mockNavigate = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(),
}));

describe('SearchResults Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks entre pruebas
  });

  test('renders the search results in a table', () => {
    // Mockear useLocation con resultados
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({
      state: {
        results: [
          { id: 1, title: 'Libro 1', author: 'Autor 1', category: 'Categoría 1', isbn: '123456' },
          { id: 2, title: 'Libro 2', author: 'Autor 2', category: 'Categoría 2', isbn: '654321' },
        ],
      },
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // Verificar que los encabezados de la tabla están presentes
    expect(screen.getByText('Código')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Autor')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('ISBN')).toBeInTheDocument();

    // Verificar que los datos de los libros están presentes
    expect(screen.getByText('Libro 1')).toBeInTheDocument();
    expect(screen.getByText('Autor 1')).toBeInTheDocument();
    expect(screen.getByText('Categoría 1')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();

    expect(screen.getByText('Libro 2')).toBeInTheDocument();
    expect(screen.getByText('Autor 2')).toBeInTheDocument();
    expect(screen.getByText('Categoría 2')).toBeInTheDocument();
    expect(screen.getByText('654321')).toBeInTheDocument();
  });

  test('navigates to the home page when "Nueva búsqueda" is clicked', () => {
    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // Verificar que el botón "Nueva búsqueda" está presente
    const searchButton = screen.getByText('Nueva búsqueda');
    expect(searchButton).toBeInTheDocument();

    // Hacer clic en el botón y verificar que navega a la página principal
    fireEvent.click(searchButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('renders an empty table when no results are provided', () => {
    // Mockear useLocation para resultados vacíos
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue({
      state: {
        results: [],
      },
    });

    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // Verificar que solo haya una fila (encabezado)
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBe(1); // Solo debería haber la fila de encabezados
  });
});
