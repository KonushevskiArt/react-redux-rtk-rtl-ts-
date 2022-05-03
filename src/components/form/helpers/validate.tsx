export interface IResOfValidation {
  name: string;
  isValid: boolean;
  errorMessage: string;
}

export default (name: string, value: string): IResOfValidation => {
  switch (name) {
    case 'name':
    case 'surname':
      const value1 = value.trim();
      if (!value) {
        return { name: name, isValid: false, errorMessage: 'This field must be filled in' };
      }
      if (value1.length > 30 || value1.length < 2) {
        return {
          name: name,
          isValid: false,
          errorMessage: 'The value should be from 3 to 30 letters',
        };
      }
    case 'zipCode':
      return { name: name, isValid: true, errorMessage: '' };
    case 'deliveryDate':
      return { name: name, isValid: true, errorMessage: '' };
    case 'city':
      return { name: name, isValid: true, errorMessage: '' };
    case 'photoFile':
      return { name: name, isValid: true, errorMessage: '' };
    case 'gender':
      return { name: name, isValid: true, errorMessage: '' };
    case 'dataProcessing':
      return { name: name, isValid: true, errorMessage: '' };
    default:
      return { name: name, isValid: true, errorMessage: '' };
  }
};
