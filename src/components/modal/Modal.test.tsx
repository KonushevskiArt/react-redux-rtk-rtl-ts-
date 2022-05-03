import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  const handleClose = jest.fn();

  it('Render Modal component', () => {
    render(
      <Modal closeHandler={handleClose}>
        <div data-testid="content">Test</div>
      </Modal>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('modal-close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByTestId('overlay'));
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
