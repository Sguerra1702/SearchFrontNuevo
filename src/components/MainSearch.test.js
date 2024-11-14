import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainSearch from './MainSearch';
import { BrowserRouter } from 'react-router-dom';
import { searchByParam } from '../api';

// Mockear la función de búsqueda
jest.mock('../api', () => ({
  searchByParam: jest.fn(),
}));

// Mockear el navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MainSearch Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks entre pruebas
  });

  test('renders the search form', () => {
    render(
      <BrowserRouter>
        <MainSearch />
      </BrowserRouter>
    );

    // Verifica que los elementos principales estén en el DOM
    expect(screen.getByText('Búsqueda de libros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa el parámetro de búsqueda')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  test('updates search type and input value', () => {
    render(
      <BrowserRouter>
        <MainSearch />
      </BrowserRouter>
    );

    // Selecciona un tipo de búsqueda
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'title' } });
    expect(screen.getByRole('combobox').value).toBe('title');

    // Ingresa un parámetro de búsqueda
    fireEvent.change(screen.getByPlaceholderText('Ingresa el parámetro de búsqueda'), { target: { value: 'React' } });
    expect(screen.getByPlaceholderText('Ingresa el parámetro de búsqueda').value).toBe('React');
  });

  test('handles empty search param gracefully', async () => {
    render(
      <BrowserRouter>
        <MainSearch />
      </BrowserRouter>
    );

    // Selecciona un tipo de búsqueda válido
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'title' } });

    // Deja el parámetro de búsqueda vacío y dispara el clic
    fireEvent.change(screen.getByPlaceholderText('Ingresa el parámetro de búsqueda'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Buscar'));

    // Verifica que no se haya llamado a la función de búsqueda y que no se muestre ningún popup
    await waitFor(() => expect(searchByParam).not.toHaveBeenCalled());
    expect(screen.queryByText('Buscando...')).not.toBeInTheDocument();
  });

});
