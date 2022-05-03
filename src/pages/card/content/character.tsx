import { ICharacterCard } from 'models/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

interface characterProps {
  data: ICharacterCard;
}

const Character = ({ data }: characterProps) => {
  const { name, birth, death, gender, hair, height, race, realm } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={style.content} data-testid="character-card-content">
      <button className={style.btnBack} onClick={handleClick} data-testid="btn-back-to-home">
        back
      </button>
      <h3>
        Name: <span>{name}</span>
      </h3>
      <p>
        Birth: <span>{birth}</span>
      </p>
      <hr />
      <p>
        Death: <span>{death}</span>
      </p>
      <hr />
      <p>
        Gender: <span>{gender}</span>
      </p>
      <hr />
      <p>
        Hair: <span>{hair}</span>
      </p>
      <hr />
      <p>
        Height: <span>{height}</span>
      </p>
      <hr />
      <p>
        Race: <span>{race}</span>
      </p>
      <hr />
      <p>
        Realm: <span>{realm}</span>
      </p>
      <hr />
    </div>
  );
};

export default Character;
