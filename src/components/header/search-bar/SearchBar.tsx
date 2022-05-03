import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { FormEvent, useEffect, useState } from 'react';
import { fetchCards, fetchSortedCards } from 'store/reducers/ActionRequests';
import { cardsSlice } from 'store/reducers/CardsSlice';
import { typeOfCards } from '../../../models/card';
import { chooseTypeOfSort } from './helpers/choseTypeOfSort';
import style from './style.module.scss';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { typeInfo, pageNumber, numberOfResultsPerPage, totalPages } = useAppSelector(
    (state) => state.cardsReducer
  );
  const { changeTypeInfo, setPageRequest, setQuantityItems } = cardsSlice.actions;

  const [requestString, setRequestString] = useState('');
  const [typeSort, setTypeSort] = useState('name');
  const [currentTypeInfo, setCurrentTypeInfo] = useState(typeInfo);

  useEffect(function () {
    const savedValue = localStorage.getItem('search-value');

    if (savedValue !== null) {
      setRequestString(savedValue);
    }
  }, []);

  const handleInputChange = ({
    target: { value: currentValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRequestString(currentValue);
    localStorage.setItem('search-value', currentValue);
  };

  const handleInputPageChange = ({
    target: { value: currentValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageRequest(Number(currentValue)));
  };

  const handleTypeInfoSelectChange = ({
    target: { value: currentValue },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const value = currentValue as typeOfCards;
    setCurrentTypeInfo(value);
  };

  const handleTypeSortSelectChange = ({
    target: { value: currentValue },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const value = currentValue;
    setTypeSort(value);
  };

  const handleNumberOfItemsSelectChange = ({
    target: { value: currentValue },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setQuantityItems(Number(currentValue)));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchCards(requestString, currentTypeInfo, numberOfResultsPerPage, pageNumber));
    dispatch(changeTypeInfo(currentTypeInfo));
  };

  const handleSort = () => {
    dispatch(
      fetchSortedCards(requestString, currentTypeInfo, numberOfResultsPerPage, pageNumber, typeSort)
    );
    dispatch(changeTypeInfo(currentTypeInfo));
  };

  return (
    <form className={style.searchBar} onSubmit={handleSubmit}>
      <div className={style.searchWrapper}>
        <label className={style.label}>
          Type of Cards:
          <select
            value={currentTypeInfo}
            onChange={handleTypeInfoSelectChange}
            data-testid="type-info"
            className={style.select}
          >
            <option value={typeOfCards.movie}>Movie</option>
            <option value={typeOfCards.book}>Book</option>
            <option value={typeOfCards.character}>Character</option>
          </select>
        </label>
        <div className={style.inputWrapper}>
          <svg className={style.searchIcon} width="15" height="15" fill="dark">
            <use xlinkHref="sprite.svg#search-ic"></use>
          </svg>
          <input
            placeholder="Enter a search word"
            data-testid="search-input"
            onChange={handleInputChange}
            value={requestString}
            className={`${style.searchInput}  ${style.input}`}
            type="text"
          />
        </div>
        <button type="submit" className="btn" data-testid="search-btn">
          Search
        </button>
      </div>
      <div className={style.downPartWrapper}>
        <div className={style.sortWrapper}>
          <label className={style.label}>
            Type of sort:
            <select
              onChange={handleTypeSortSelectChange}
              data-testid="type-sort"
              className={style.select}
            >
              {chooseTypeOfSort(typeInfo)}
            </select>
          </label>
          <button onClick={handleSort} type="button" className="btn" data-testid="sort-btn">
            Sort
          </button>
        </div>
        <div className={style.pageOptions}>
          <label className={style.label}>
            Namber of items:
            <select
              value={numberOfResultsPerPage}
              onChange={handleNumberOfItemsSelectChange}
              data-testid="number-items"
              className={style.select}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <label className={style.label}>
            Page:
            <input
              data-testid="number-of-page-input"
              onChange={handleInputPageChange}
              value={pageNumber}
              className={`${style.input} ${style.pageInput}`}
              type="number"
              min={1}
              max={9999}
            />
          </label>
        </div>
      </div>
      <p className={style.pages}>All pages: {totalPages || 0}</p>
    </form>
  );
};

export default SearchBar;
