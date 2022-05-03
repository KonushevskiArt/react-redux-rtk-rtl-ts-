import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

test('Renders learn react link', () => {
  const store = setupStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const appEl = screen.getByTestId('app');
  expect(appEl).toBeInTheDocument();
});
