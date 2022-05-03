import { useAppSelector } from 'hooks/redux';
import React from 'react';
import BigSpinner from '../../components/big-spinner';
import CardsList from '../../components/cards-list/CardsList';
import SearchBar from '../../components/header/search-bar/SearchBar';
import style from './style.module.scss';
import { CSSTransition } from 'react-transition-group';

const HomePage = () => {
  const { isError, isLoading, typeInfo, searchedList } = useAppSelector(
    (state) => state.cardsReducer
  );
  const nodeRef = React.useRef(null);

  return (
    <div className={style.homePage} data-testid="home-page">
      <SearchBar></SearchBar>
      <CSSTransition
        classNames={{
          enterActive: style.showError,
          exitActive: style.hideError,
        }}
        in={isLoading}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <BigSpinner />
      </CSSTransition>

      <CSSTransition
        classNames={{
          enterActive: style.showError,
          exitActive: style.hideError,
        }}
        in={isError}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <p className={style.error} data-testid="network-error">
          Network error...
        </p>
      </CSSTransition>

      {!isLoading && !isError ? (
        <CardsList cardList={searchedList} typeCard={typeInfo}></CardsList>
      ) : null}
    </div>
  );
};
export default HomePage;
