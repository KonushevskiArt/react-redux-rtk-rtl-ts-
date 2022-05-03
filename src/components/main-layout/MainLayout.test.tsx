import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';

describe('MainLayout', () => {
  it('Render main layout component', () => {
    render(<MainLayout />);
    const mainLayoutEl = screen.getByTestId('main-layout');
    expect(mainLayoutEl).toBeInTheDocument();
  });
});
