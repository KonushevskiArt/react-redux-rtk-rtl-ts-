import { IBookCard } from 'models/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

interface bookProps {
  data: IBookCard;
}

const Book = ({ data }: bookProps) => {
  const { name } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={style.content} data-testid="book-card-content">
      <button className={style.btnBack} onClick={handleClick} data-testid="btn-back-to-home">
        back
      </button>
      <h3>
        Name: <span>{name}</span>
      </h3>
      <hr />
    </div>
  );
};

export default Book;
