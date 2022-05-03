import React from 'react';
import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('Portal', () => {
  it('Render Portal component', () => {
    render(
      <Portal>
        <div data-testid="portal">Test</div>
      </Portal>
    );
    expect(screen.getByTestId('portal')).toBeInTheDocument();
  });
  it('Should be unmount', () => {
    const { unmount, getByText, queryByText } = render(
      <Portal>
        <div data-testid="portal">Test</div>
      </Portal>
    );
    expect(getByText('Test')).toBeInTheDocument();
    unmount();
    expect(queryByText('Test')).not.toBeInTheDocument();
  });
});
