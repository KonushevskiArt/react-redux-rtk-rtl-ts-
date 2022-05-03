import { useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import Form from '../../components/form/Form';
import FormCard from '../../components/form/form-card/FormCard';
import style from './style.module.scss';

const FormPage = () => {
  const { cardsList } = useAppSelector((state) => state.formReducer);

  return (
    <div data-testid="form-page">
      <div className={style.formContainer}>
        <Form data-testid="form" />
      </div>
      <div className={style.cardList} data-testid="card-list">
        {cardsList.map((el, i) => (
          <FormCard key={el.name + String(new Date()) + i} data={el}></FormCard>
        ))}
      </div>
    </div>
  );
};

export default FormPage;
