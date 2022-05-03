import { useAppSelector } from 'hooks/redux';
import { card, ICharacterCard, IMovieCard, typeOfCards } from 'models/card';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Book from './content/book';
import Character from './content/character';
import Movie from './content/movie';

const CardPage = () => {
  const params = useParams();
  const { typeInfo, searchedList } = useAppSelector((state) => state.cardsReducer);
  const data: card = searchedList.filter((el) => el._id === params.id)[0];
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, []);

  if (!data) {
    return <p>There is not any information</p>;
  }
  let content: JSX.Element;
  switch (typeInfo) {
    case typeOfCards.movie:
      content = <Movie data={data as IMovieCard} />;
      break;
    case typeOfCards.book:
      content = <Book data={data} />;
      break;
    case typeOfCards.character:
      content = <Character data={data as ICharacterCard} />;
      break;
  }
  return <div data-testid="card-page">{content}</div>;
};

export default CardPage;
