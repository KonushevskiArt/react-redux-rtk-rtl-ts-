import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IBookCard } from '../../../models/card';
import style from './style.module.scss';
import { CSSTransition } from 'react-transition-group';

interface ICardProps {
  data: IBookCard;
}

const Card = ({ data }: ICardProps) => {
  const navigate = useNavigate();
  const [showAnima, setShowAnima] = useState(false);
  useEffect(() => {
    setShowAnima(true);
  }, []);

  const { name, _id } = data;
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
      <li className={style.card} data-testid="book-card" onClick={clickHandler}>
        <h3 className={style.title}>Name: {name}</h3>
      </li>
    </CSSTransition>
  );
};

export default Card;
