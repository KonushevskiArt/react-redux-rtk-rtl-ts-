import { typeOfCards } from 'models/card';

export const chooseTypeOfSort = (typeInfo: typeOfCards) => {
  switch (typeInfo) {
    case typeOfCards.movie:
      return (
        <>
          <option value={'name'}>Name</option>
          <option value={'budgetInMillions'}>Budget</option>
          <option value={'runtimeInMinutes'}>Runtime</option>
        </>
      );
    case typeOfCards.character:
      return (
        <>
          <option value={'name'}>Name</option>
          <option value={'race'}>Race</option>
          <option value={'birth'}>Birth</option>
        </>
      );
    case typeOfCards.book:
      return (
        <>
          <option value={'name'}>Name</option>
        </>
      );
  }
};
