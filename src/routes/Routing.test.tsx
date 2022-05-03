import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import MainLayout from 'components/main-layout/MainLayout';
import AppRoutes from 'routes';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import Header from 'components/header/Header';

const renderApp = (initialPath: string[] = ['']) => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialPath}>
        <div data-testid="app">
          <Header />
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </div>
      </MemoryRouter>
    </Provider>
  );
};
describe('Routing', () => {
  it('Should render the home page by default', () => {
    renderApp();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
  it('Should switch pages by links', () => {
    renderApp();
    const mainLink = screen.getByTestId('to-home');
    const aboutLink = screen.getByTestId('to-about');
    const formLink = screen.getByTestId('to-form');
    userEvent.click(aboutLink);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    userEvent.click(formLink);
    expect(screen.getByTestId('form-page')).toBeInTheDocument();
  });
  it('Should show error page if unknown url', async () => {
    renderApp(['/blabla']);

    expect(await screen.findByText(/error 404/i)).toBeInTheDocument();
  });

  it('should show card page after click on any card and return to home page after click on "back" button', async () => {
    renderApp();
    const toHomeLink = screen.getByTestId('to-home');
    userEvent.click(toHomeLink);
    const submitBtnEl = screen.getByText(/search/i);
    userEvent.click(submitBtnEl);
    const listEl = await screen.findByTestId('cardList');
    userEvent.click(listEl.children[0]);
    expect(screen.getByTestId(/card-page/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-back-to-home'));
    userEvent.click(toHomeLink);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
