import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NoResultsPopup from './NoResultsPopup';

// Mockear el navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NoResultsPopup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks entre pruebas
  });

  test('renders the popup with the correct message', () => {
    render(
      <BrowserRouter>
        <NoResultsPopup />
      </BrowserRouter>
    );

    // Verificar que el mensaje aparece correctamente
    expect(screen.getByText('No se encontraron resultados para los parámetros especificados.')).toBeInTheDocument();
  });

  test('navigates to the home page when clicking "Ok"', () => {
    render(
      <BrowserRouter>
        <NoResultsPopup />
      </BrowserRouter>
    );

    // Verificar que el botón "Ok" está presente
    const okButton = screen.getByText('Ok');
    expect(okButton).toBeInTheDocument();

    // Hacer clic en el botón y verificar la navegación
    fireEvent.click(okButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
