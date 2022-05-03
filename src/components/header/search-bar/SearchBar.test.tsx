import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const renderSearchBar = () => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
};

describe('SearchBar', () => {
  const testWord = 'bla bla bla';
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => ''),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });
  it('Renders search-bar component', () => {
    renderSearchBar();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
  it('Should call localStorage getItem on render', () => {
    renderSearchBar();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  it('Should call localStorage setItem on text change', () => {
    renderSearchBar();
    const inputEl = screen.getByPlaceholderText<HTMLInputElement>(/Enter a search word/i);
    expect(inputEl.value).not.toEqual(testWord); //???????????????????!!!!!!!!!!!
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('search-value');
    userEvent.type(inputEl, testWord);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('search-value', testWord);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(11);
  });
  it('search bar focus', () => {
    renderSearchBar();
    const selectTypeInfo = screen.getByRole('combobox', {
      name: /type of cards:/i,
    });
    const input = screen.getByPlaceholderText<HTMLInputElement>(/Enter a search word/i);
    const searchBtn = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.tab();
    expect(selectTypeInfo).toHaveFocus();
    userEvent.tab();
    expect(input).toHaveFocus();
    userEvent.tab();
    expect(searchBtn).toHaveFocus();
  });
  it('check select element in search bar', () => {
    renderSearchBar();
    const selectTypeInfoEl = screen.getByRole('combobox', {
      name: /type of cards:/i,
    });
    const optionMovie = screen.getByText<HTMLOptionElement>(/movie/i);
    expect(optionMovie.selected).toBeTruthy();
    userEvent.selectOptions(selectTypeInfoEl, 'book');
    const optionBook = screen.getByText<HTMLOptionElement>(/book/i);
    expect(optionBook.selected).toBeTruthy();
    expect(optionMovie.selected).toBeFalsy();
  });
});
