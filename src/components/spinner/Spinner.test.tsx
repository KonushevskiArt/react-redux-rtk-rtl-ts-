import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './index';

describe('Spinner', () => {
  it('Render spinner component', () => {
    render(<Spinner />);
    const spinnerEl = screen.getByTestId('spinner');
    expect(spinnerEl).toBeInTheDocument();
  });
});
