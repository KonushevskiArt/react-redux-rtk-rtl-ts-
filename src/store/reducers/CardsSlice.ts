import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { card, ICardsState, typeOfCards } from 'models/card';

export const cardsState: ICardsState = {
  searchedList: [],
  isLoading: false,
  isError: false,
  typeInfo: typeOfCards.movie,
  pageNumber: 1,
  totalPages: 0,
  numberOfResultsPerPage: 10,
  requestString: '',
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsState,
  reducers: {
    setError(state) {
      state.isError = true;
      state.isLoading = false;
    },
    startLoading(state) {
      state.isError = false;
      state.isLoading = true;
    },
    setSearchedList(state, action: PayloadAction<card[]>) {
      state.searchedList = action.payload;
      state.isLoading = false;
    },
    changeTypeInfo(state, action: PayloadAction<typeOfCards>) {
      state.typeInfo = action.payload;
    },
    setPageRequest(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setQuantityItems(state, action: PayloadAction<number>) {
      state.numberOfResultsPerPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.requestString = action.payload;
    },
  },
});

export default cardsSlice.reducer;
