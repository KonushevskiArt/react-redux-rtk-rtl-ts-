import { fetchInfoByName, fetchInfoByNameWithSort } from 'services/myapi-service';
import { AppDispatch } from 'store/store';
import { cardsSlice } from './CardsSlice';

export const fetchCards =
  (requestString: string, typeInfo: string, numberOfResultsPerPage: number, pageNumber: number) =>
  (cardsDispatch: AppDispatch) => {
    const { setError, startLoading, setSearchedList, setTotalPages } = cardsSlice.actions;

    cardsDispatch(startLoading());

    fetchInfoByName(requestString, typeInfo, numberOfResultsPerPage, pageNumber)
      .then((data) => {
        cardsDispatch(setTotalPages(data.pages));
        cardsDispatch(setSearchedList(data.docs));
      })
      .catch((e) => {
        console.log(e);
        cardsDispatch(setError());
      });
  };

export const fetchSortedCards =
  (
    requestString: string,
    typeInfo: string,
    numberOfResultsPerPage: number,
    pageNumber: number,
    typeSort: string
  ) =>
  (cardsDispatch: AppDispatch) => {
    const { setError, startLoading, setSearchedList, setTotalPages } = cardsSlice.actions;
    cardsDispatch(startLoading());

    fetchInfoByNameWithSort(requestString, typeInfo, typeSort, numberOfResultsPerPage, pageNumber)
      .then((data) => {
        cardsDispatch(setTotalPages(data.total));
        cardsDispatch(setSearchedList(data.docs));
      })
      .catch((e) => {
        console.log(e);
        cardsDispatch(setError());
      });
  };
