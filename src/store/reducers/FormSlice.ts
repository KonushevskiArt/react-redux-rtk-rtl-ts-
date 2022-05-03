import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  emptyErrorMessages,
  emptyFormValues,
  IErrorMessages,
  IFormState,
  IFormValues,
  IResOfValidation,
} from 'models/form';

export const formState: IFormState = {
  cardsList: [],
  formValues: emptyFormValues,
  errorMessages: {
    name: '',
    surname: '',
    zipCode: '',
    deliveryDate: '',
    birthdayDate: '',
    country: '',
    presents: '',
    photoFile: '',
    gender: '',
    dataProcessing: '',
  },
  validationErrors: [],
  isTouched: false,
  photoFile: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState: formState,
  reducers: {
    addCard(state, action: PayloadAction<IFormValues>) {
      state.cardsList = [...state.cardsList, action.payload];
    },
    setValidationErrors(state, action: PayloadAction<IResOfValidation[]>) {
      state.validationErrors = action.payload;
    },
    setErrorMessages(state, action: PayloadAction<IErrorMessages>) {
      state.errorMessages = action.payload;
    },
    saveFormValues(state, action: PayloadAction<IFormValues>) {
      state.formValues = action.payload;
    },
    setIsTouched(state) {
      state.isTouched = true;
    },
    setFormValue(state, action: PayloadAction<{ name: string; value: string }>) {
      const { value, name } = action.payload;
      state.formValues = { ...state.formValues, [name]: value };
    },
    reset(state) {
      state.isTouched = false;
      state.errorMessages = emptyErrorMessages;
      state.validationErrors = [];
      state.formValues = emptyFormValues;
      state.photoFile = null;
    },
    removeValidationError(state, action: PayloadAction<string>) {
      const i = state.validationErrors.findIndex((el) => el.name === action.payload);
      if (i >= 0) {
        const currentValidErrors = state.validationErrors.slice();
        currentValidErrors.splice(i, 1);

        state.validationErrors = currentValidErrors;
        state.errorMessages = { ...state.errorMessages, [action.payload]: '' };
      }
    },
  },
});

export default formSlice.reducer;
