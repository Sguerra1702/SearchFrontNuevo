import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UnderConstructionPopup from './UnderConstructionPopup';

describe('UnderConstructionPopup Component', () => {
  test('renders the construction message and the "Ok" button', () => {
    // Mockear la función onClose
    const mockOnClose = jest.fn();

    render(<UnderConstructionPopup onClose={mockOnClose} />);

    // Verificar que el mensaje de "en construcción" está presente
    expect(screen.getByText('Esta funcionalidad está en construcción')).toBeInTheDocument();

    // Verificar que el botón "Ok" está presente
    const okButton = screen.getByText('Ok');
    expect(okButton).toBeInTheDocument();
  });

  test('calls the onClose function when "Ok" button is clicked', () => {
    // Mockear la función onClose
    const mockOnClose = jest.fn();

    render(<UnderConstructionPopup onClose={mockOnClose} />);

    // Hacer clic en el botón "Ok"
    const okButton = screen.getByText('Ok');
    fireEvent.click(okButton);

    // Verificar que la función onClose ha sido llamada
    expect(mockOnClose).toHaveBeenCalled();
  });
});
