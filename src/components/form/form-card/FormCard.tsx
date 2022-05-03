import React, { useEffect, useRef, useState } from 'react';
import { IFormValues } from '../../../models/form';
import Spinner from '../../spinner/index';
import style from './style.module.scss';

interface IFormCardProps {
  data: IFormValues;
}

const FormCard = ({ data }: IFormCardProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const downloadPhoto = (reader: FileReader) => {
    setIsLoading(false);
    if (imgRef.current) {
      imgRef.current.src = reader.result as string;
    }
  };
  const handleError = (reader: FileReader) => {
    setIsLoading(false);
    console.log(reader.error);
  };

  useEffect(() => {
    try {
      if (data.photoFile !== null && data.photoFile !== undefined) {
        const reader = new FileReader();
        const img = data.photoFile as File;
        setIsLoading(true);
        reader.onload = () => downloadPhoto(reader);
        reader.onerror = () => handleError(reader);
        reader.readAsDataURL(img);
      } else {
        if (imgRef.current) {
          imgRef.current.src = 'default-photo.png';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const {
    name,
    surname,
    zipCode,
    birthdayDate,
    deliveryDate,
    country,
    gender,
    presents,
    notifications,
  } = data;

  const convertPresents = presents as string[];
  return (
    <div className={style.card} data-testid="form-card">
      {isLoading && <Spinner />}
      {!isLoading && (
        <img ref={imgRef} className={style.img} src="" alt="my photo" data-testid="card-image" />
      )}
      <div className={style.description}>
        <h3 className={style.title}>
          {name} {surname}
        </h3>
        <p data-testid="card-zip-code">
          Zip-code: <span>{zipCode}</span>
        </p>
        <p data-testid="card-birthday">
          Birthday: <span>{birthdayDate}</span>
        </p>
        <p data-testid="card-delivery">
          Delivery date: <span>{deliveryDate}</span>
        </p>
        <p data-testid="card-country">
          Your country: <span>{country}</span>
        </p>
        <p data-testid="card-gifts">
          Additional gifts: <br />
          {convertPresents.map((el, i) => (
            <span key={el + i + Date.now()}>{el}</span>
          ))}
        </p>
        <p data-testid="card-gender">
          Gender: <span>{gender}</span>
        </p>
        <p data-testid="card-notifications">
          Receive notifications: <span>{notifications ? 'yes' : 'not'}</span>
        </p>
      </div>
    </div>
  );
};
export default FormCard;
