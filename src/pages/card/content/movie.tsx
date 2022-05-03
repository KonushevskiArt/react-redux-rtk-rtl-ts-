import { IMovieCard } from 'models/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

interface MovieProps {
  data: IMovieCard;
}

const Movie = ({ data }: MovieProps) => {
  const {
    academyAwardNominations = '',
    runtimeInMinutes = '',
    rottenTomatoesScore = '',
    name = '',
    budgetInMillions = '',
    academyAwardWins = '',
  } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={style.content} data-testid="movie-card-content">
      <button className={style.btnBack} onClick={handleClick} data-testid="btn-back-to-home">
        back
      </button>
      <h3>
        Name: <span>{name}</span>
      </h3>
      <p>
        Academy award nominations: <span>{academyAwardNominations}</span>
      </p>
      <hr />
      <p>
        Runtime in minutes: <span>{runtimeInMinutes}</span>
      </p>
      <hr />
      <p>
        Rotten tomatoes score: <span>{rottenTomatoesScore}</span>
      </p>
      <hr />
      <p>
        Budget in millions: <span>{budgetInMillions}</span>
      </p>
      <hr />
      <p>
        Academy award wins: <span>{academyAwardWins}</span>
      </p>
    </div>
  );
};

export default Movie;
