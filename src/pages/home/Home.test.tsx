import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  allBooks,
  moviesResponse,
  moviesSortedByBudget,
  oneMovieResponse,
  twentyCharactersFromPage2,
  zeroMovieResponse,
} from './homeTestMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const server = setupServer(
  rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...moviesResponse })); /// write the response
  })
);

describe('fetch info from an API', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('Check default state of home page', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/no matching element found/i)).toBeInTheDocument();
  });
  it('Show the loader during the download and delete the loader after the download is complete', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    userEvent.type(searchInputEl, '');
    userEvent.click(submitBtnEl);
    expect(await screen.findByTestId('big-spinner')).toBeInTheDocument();
    expect((await screen.findAllByTestId('movie-card')).length).toEqual(8);
    // expect(screen.queryByTestId('big-spinner')).not.toBeInTheDocument();
    // animation 450ms and then unmount
  });
  it("Receive eight objects from the API (request: '')", async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    userEvent.type(searchInputEl, '');
    userEvent.click(submitBtnEl);
    expect((await screen.findAllByTestId('movie-card')).length).toEqual(8);
  });
  it("Receive one suitable object from the API (request: 'The Unexpected')", async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...oneMovieResponse }));
      })
    );

    userEvent.type(searchInputEl, 'The Unexpected');
    userEvent.click(submitBtnEl);
    expect((await screen.findAllByTestId('movie-card')).length).toEqual(1);
  });
  it("Receive zero objects from the API (request: 'bla bla bla')", async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...zeroMovieResponse }));
      })
    );

    userEvent.type(searchInputEl, 'bla bla bla');
    userEvent.click(submitBtnEl);
    const listEl = await screen.findByTestId('cardList');
    expect(listEl.children.length).toEqual(0);
    expect(await screen.findByText(/no matching element found/i)).toBeInTheDocument();
  });
  it('fail api request, show network error message', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    userEvent.type(searchInputEl, 'something');
    userEvent.click(submitBtnEl);
    expect(await screen.findByText(/network error\.\.\./i)).toBeInTheDocument();
  });
  it('change type of information from movie (by default) to book and request all books', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/book', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...allBooks }));
      })
    );

    userEvent.type(searchInputEl, '');
    const inputTypeOfInfo = screen.getByRole('combobox', {
      name: /type of cards:/i,
    });
    userEvent.selectOptions(inputTypeOfInfo, 'book');
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Book' }).selected).toBe(true);
    userEvent.click(submitBtnEl);
    const listEl = await screen.findByTestId('cardList');
    expect(listEl.children.length).toEqual(3);
  });
  it('make a request sorted movie cards by budget (8 movies)', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...moviesSortedByBudget }));
      })
    );

    userEvent.type(searchInputEl, '');
    const inputTypeOfSort = screen.getByRole('combobox', {
      name: /type of sort:/i,
    });
    userEvent.selectOptions(inputTypeOfSort, 'Budget');
    const optionBudgetEl = screen.getByRole<HTMLOptionElement>('option', { name: 'Budget' });
    expect(optionBudgetEl.selected).toBe(true);
    userEvent.click(submitBtnEl);
    const listEl = await screen.findByTestId('cardList');
    expect(listEl.children[0]).toHaveTextContent(/Budget: 93/i);
    expect(listEl.children[7]).toHaveTextContent(/Budget: 675/i);
  });
  it('check input number of items per page and input page number and text pages in totall', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    const searchInputEl = screen.getByPlaceholderText(/Enter a search word/i);
    const submitBtnEl = screen.getByText(/search/i);
    server.use(
      rest.get('https://the-one-api.dev/v2/movie', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ ...twentyCharactersFromPage2 }));
      })
    );
    const inputNumberOfItems = screen.getByRole('combobox', {
      name: /namber of items:/i,
    });
    userEvent.type(searchInputEl, '');
    userEvent.selectOptions(inputNumberOfItems, '20');
    expect(screen.getByRole<HTMLOptionElement>('option', { name: '20' }).selected).toBe(true);
    const inputPageEl = screen.getByRole('spinbutton', {
      name: /page:/i,
    });
    userEvent.type(inputPageEl, '2');
    userEvent.click(submitBtnEl);
    const listEl = await screen.findByTestId('cardList');
    expect(listEl.children.length).toEqual(20);
    expect(screen.getByText(/all pages: 47/i));
  });
});
