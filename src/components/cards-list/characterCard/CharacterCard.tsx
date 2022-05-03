import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ICharacterCard } from '../../../models/card';
import style from './style.module.scss';
import { CSSTransition } from 'react-transition-group';

interface ICardProps {
  data: ICharacterCard;
}

const Card = ({ data }: ICardProps) => {
  const navigate = useNavigate();
  const [showAnima, setShowAnima] = useState(false);
  useEffect(() => {
    setShowAnima(true);
  }, []);
  const { name, birth, _id } = data;

  const clickHandler = () => {
    navigate(`/home/${_id}`);
  };

  return (
    <CSSTransition
      classNames={{
        enterActive: style.showCard,
        exitActive: style.hideCard,
      }}
      in={showAnima}
      timeout={400}
      mountOnEnter
      unmountOnExit
    >
      <li className={style.card} data-testid="character-card" onClick={clickHandler}>
        <h3 className={style.title}>Name: {name}</h3>
        <span>Date of birth: {birth}</span>
      </li>
    </CSSTransition>
  );
};

export default Card;
