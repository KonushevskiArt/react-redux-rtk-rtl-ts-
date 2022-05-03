import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('render header component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerEl = screen.getByTestId('header');
    expect(headerEl).toBeInTheDocument();
  });
});
