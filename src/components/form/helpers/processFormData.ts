import { IErrorMessages, IFormValues, IResOfValidation } from '../../../models/form';
import validate from './validate';

export default (form: HTMLFormElement) => {
  const formValues: IFormValues = {
    name: '',
    surname: '',
    zipCode: '',
    birthdayDate: '',
    deliveryDate: '',
    country: '',
    dataProcessing: '',
    notifications: '',
    gender: '',
    presents: [],
    photoFile: null,
  };
  const errorMessages: IErrorMessages = {};
  const validationErrors: IResOfValidation[] = [];

  for (let i = 0; i < form.length - 1; i++) {
    const el = form[i] as HTMLInputElement | HTMLSelectElement;
    // console.log(el);
    const { name, value } = el;

    const typedValue = value as File & string[] & string;
    const typedName = name as keyof IFormValues;

    formValues[typedName] = typedValue;
    let resOfValidation: IResOfValidation = { name: name, isValid: true, errorMessage: '' };

    if (
      el instanceof HTMLInputElement &&
      (name === 'gender' || name === 'dataProcessing' || name === 'notifications')
    ) {
      if (name === 'gender' && el.checked) {
        formValues[name] = value;
      }
      if (name === 'dataProcessing') {
        resOfValidation = validate(name, String(el.checked));
      }
      if (name === 'notifications') {
        formValues[name] = String(el.checked);
      }
    } else {
      resOfValidation = validate(name, value);
    }

    if (resOfValidation.isValid) {
      if (
        !(name === 'gender') &&
        !(name === 'notifications') &&
        !(name === 'dataProcessing') &&
        !(name === 'photoFile')
      ) {
        formValues[typedName] = typedValue;
        if (el instanceof HTMLSelectElement && name === 'presents') {
          const selectedValues: string[] = [];
          Array.from(el.selectedOptions).forEach((el) => {
            selectedValues.push(el.value);
          });
          formValues[name] = selectedValues;
        }
      }
      if (el instanceof HTMLInputElement && name === 'dataProcessing') {
        formValues[name] = String(el.checked);
      }
      if (el instanceof HTMLInputElement && name === 'photoFile') {
        if (el.files !== null) {
          formValues[name] = el.files[0];
        }
      }
    } else {
      const typedName = name as keyof IErrorMessages;
      errorMessages[typedName] = resOfValidation.errorMessage;
      validationErrors.push(resOfValidation);
    }
  }
  return { formValues, errorMessages, validationErrors };
};
