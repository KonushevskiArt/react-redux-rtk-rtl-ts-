import { IResOfValidation } from '../../../models/form';

const getInvalid = (name: string, message: string): IResOfValidation => {
  return {
    name: name,
    isValid: false,
    errorMessage: message,
  };
};

export default (name: string, value: string): IResOfValidation => {
  switch (name) {
    case 'name':
    case 'surname':
    case 'zipCode':
      const value1 = value.trim();
      if (!value1) {
        return getInvalid(name, `The field ${name} must be filled in`);
      }
      if ((value1.length > 30 || value1.length < 2) && name !== 'zipCode') {
        return getInvalid(name, `The ${name} should be from 3 to 30 characters`);
      }
      if ((value1.length > 9 || value1.length < 5) && name === 'zipCode') {
        return getInvalid(name, 'The postal code must contain from 5 to 9 characters');
      }
      return { name: name, isValid: true, errorMessage: '' };
    case 'deliveryDate':
    case 'birthdayDate':
      const value2 = value.trim();
      if (!value2) {
        return getInvalid(name, `You have to choose a ${name}`);
      }
      const dateNow = new Date().getTime();
      const valueDate = new Date(value).getTime();
      if (name === 'deliveryDate') {
        if (dateNow > valueDate) {
          return getInvalid(name, 'The delivery date cannot be less than today');
        }
        const dateInMonth = dateNow + 1000 * 60 * 60 * 24 * 30;
        if (dateInMonth < valueDate) {
          return getInvalid(name, 'The delivery can only be made within the next 30 days');
        }
      } else {
        const dateTheOldest = dateNow - 1000 * 60 * 60 * 24 * 365 * 130;
        if (dateTheOldest > valueDate) {
          return getInvalid(name, "You can't be over 130 years old");
        }
        if (dateNow < valueDate) {
          return getInvalid(name, 'You cannot be less than 0 years old');
        }
      }
      return { name: name, isValid: true, errorMessage: '' };
    case 'city':
      const value3 = value.trim();
      if (!value3) {
        return getInvalid(name, 'You have to choose your city');
      }
      return { name: name, isValid: true, errorMessage: '' };
    // case 'photoFile':
    //   if (!value) {
    //     return getInvalid(name, 'You have to choose your photo');
    //   }
    //   return { name: name, isValid: true, errorMessage: '' };
    case 'dataProcessing':
      if (value === 'false') {
        return getInvalid(
          name,
          'Unfortunately, you cannot use this resource until you consent to the processing of your personal data'
        );
      }
      return { name: name, isValid: true, errorMessage: '' };
    default:
      return { name: name, isValid: true, errorMessage: '' };
  }
};
