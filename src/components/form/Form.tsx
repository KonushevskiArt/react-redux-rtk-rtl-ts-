import React, { ChangeEvent, FormEvent, useState } from 'react';
import style from './style.module.scss';
import { IFormData } from '../../models/form';
import processFormData from './helpers/processFormData';
import { formSlice } from 'store/reducers/FormSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

const Form = () => {
  const {
    addCard,
    setValidationErrors,
    setErrorMessages,
    saveFormValues,
    reset,
    setIsTouched,
    removeValidationError,
    setFormValue,
  } = formSlice.actions;

  const dispatch = useAppDispatch();
  const { validationErrors, errorMessages, isTouched, formValues } = useAppSelector(
    (state) => state.formReducer
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { validationErrors, errorMessages, formValues }: IFormData = processFormData(
      e.currentTarget
    );

    if (validationErrors.length) {
      dispatch(setValidationErrors(validationErrors));
      dispatch(setErrorMessages(errorMessages));
      dispatch(saveFormValues(formValues));
    } else {
      dispatch(addCard(formValues));
      dispatch(reset());
      e.currentTarget.reset();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormValue({ name, value }));
    if (!isTouched) {
      dispatch(setIsTouched());
    }
    dispatch(removeValidationError(name));
  };

  const {
    name,
    surname,
    zipCode,
    birthdayDate,
    deliveryDate,
    country,
    photoFile,
    gender,
    dataProcessing,
  } = errorMessages;

  const countErrors = validationErrors.length;
  return (
    <form name="myform" onSubmit={handleSubmit} action="" className={style.form} data-testid="form">
      <label className={style.label}>
        Name:
        <input
          data-testid="name"
          className={name ? `${style.input} ${style.inputError}` : style.input}
          name="name"
          type="text"
          onChange={handleChange}
          value={formValues.name || ''}
        />
      </label>
      <small data-testid="name-error" className={style.textError}>
        {name}
      </small>

      <label className={style.label}>
        Surname:
        <input
          data-testid="surname"
          className={surname ? `${style.input} ${style.inputError}` : style.input}
          name="surname"
          type="text"
          onChange={handleChange}
          value={formValues.surname || ''}
        />
      </label>
      <small className={style.textError}>{surname}</small>

      <label className={style.label}>
        Zip-code:
        <input
          data-testid="zip-code"
          className={zipCode ? `${style.input} ${style.inputError}` : style.input}
          name="zipCode"
          type="number"
          onChange={handleChange}
          value={formValues.zipCode || ''}
        />
      </label>
      <small className={style.textError}>{zipCode}</small>

      <label className={style.label}>
        Birthday:
        <input
          data-testid="birthday-date"
          className={birthdayDate ? `${style.input} ${style.inputError}` : style.input}
          name="birthdayDate"
          type="date"
          onChange={handleChange}
          value={formValues.birthdayDate || ''}
        />
      </label>
      <small className={style.textError}>{birthdayDate} </small>

      <label className={style.label}>
        Delivery date:
        <input
          data-testid="delivery-date"
          className={deliveryDate ? `${style.input} ${style.inputError}` : style.input}
          name="deliveryDate"
          type="date"
          onChange={handleChange}
          value={formValues.deliveryDate || ''}
        />
      </label>
      <small className={style.textError}>{deliveryDate} </small>

      <label className={style.label}>
        Choose your country:
        <select
          data-testid="country"
          className={country ? `${style.input} ${style.inputError}` : style.input}
          name="country"
        >
          <option value="Belarus">Belarus</option>
          <option value="Russia">Russia</option>
          <option value="China">China</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
        </select>
      </label>
      <small className={style.textError}>{country} </small>

      <label className={style.label}>
        List of additional gifts:
        <select className={style.input} data-testid="gifts" multiple name="presents">
          <option value="Gift1">Some Gift 1</option>
          <option value="Gift2">Some Gift 2</option>
          <option value="Gift3">Some Gift 3</option>
          <option value="Gift4">Some Gift 4</option>
          <option value="Gift5">Some Gift 5</option>
        </select>
      </label>

      <div className={style.genderWrapper}>
        Choose your gender:
        <label>
          man:
          <input data-testid="gender" name="gender" type="radio" value="man" defaultChecked />
        </label>
        <label>
          woman:
          <input data-testid="gender" name="gender" type="radio" value="woman" />
        </label>
      </div>
      <small className={style.textError}>{gender}</small>

      <label className={`${style.label} ${style.uploadLabel}`}>
        Upload your photo:
        <input
          data-testid="photo-file"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
          name="photoFile"
          type="file"
        />
      </label>
      <small className={style.textError}>{photoFile} </small>

      <label className={`${style.label} ${style.checkboxLabel}`}>
        Do you want to receive notifications?
        <input data-testid="notifications" type="checkbox" name="notifications" />
      </label>

      <label className={`${style.label} ${style.checkboxLabel}`}>
        Do you agree to data processing?
        <input
          data-testid="data-processing"
          onChange={handleChange}
          type="checkbox"
          name="dataProcessing"
        />
      </label>
      <small className={style.textError}>{dataProcessing} </small>

      <button
        data-testid="submit"
        disabled={countErrors > 0 ? true : isTouched ? false : true}
        className={`btn ${style.btnSubmit}`}
        type="submit"
      >
        Submit
      </button>

      {isSubmitted && (
        <p data-testid="card-created" className={style.textSuccsess}>
          The card was created successfully!
        </p>
      )}
    </form>
  );
};
export default Form;
