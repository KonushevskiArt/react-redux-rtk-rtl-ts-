import React from 'react';
import { render, screen } from '@testing-library/react';
import BigSpinner from './index';

describe('Big spinner', () => {
  it('Render big spinner component', () => {
    render(<BigSpinner />);
    const spinnerEl = screen.getByTestId('big-spinner');
    expect(spinnerEl).toBeInTheDocument();
  });
});
