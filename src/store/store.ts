import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from 'store/reducers/FormSlice';
import cardsReducer from 'store/reducers/CardsSlice';

const rootReducer = combineReducers({
  cardsReducer,
  formReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['form/saveFormValues', 'form/addCard'],
          ignoredPaths: ['formReducer.cardsList.0.photoFile', 'formReducer.formValues.photoFile'],
        },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
