import React from 'react';
import { IBookCard, ICard, ICharacterCard, IMovieCard, typeOfCards } from '../../models/card';
import { matchTypeOfCard } from './helpers/matchTypeOfCard';
import style from './style.module.scss';

interface ICardListProps {
  cardList: ICard[] | IMovieCard[] | ICharacterCard[] | IBookCard[];
  typeCard: typeOfCards;
}

const CardsList = ({ typeCard, cardList }: ICardListProps) => {
  return (
    <div>
      {!cardList.length && (
        <p className={style.noMatched} data-testid="no-matching-element">
          no matching element found
        </p>
      )}
      <ul className={style.cardList} data-testid="cardList">
        {cardList.map((el) => {
          return matchTypeOfCard(el, typeCard);
        })}
      </ul>
    </div>
  );
};

export default CardsList;
