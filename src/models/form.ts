export interface IFormValues {
  name: string;
  surname: string;
  zipCode: string;
  birthdayDate: string;
  deliveryDate: string;
  country: string;
  dataProcessing: string;
  notifications: string;
  gender: string;
  presents: string[];
  photoFile: File | null;
}

export interface IFormData {
  formValues: IFormValues;
  errorMessages: IErrorMessages;
  validationErrors: IResOfValidation[];
}
export interface IErrorMessages {
  name?: string;
  surname?: string;
  zipCode?: string;
  deliveryDate?: string;
  birthdayDate?: string;
  country?: string;
  presents?: string;
  photoFile?: string;
  gender?: string;
  dataProcessing?: string;
}

export const emptyErrorMessages = {
  name: '',
  surname: '',
  zipCode: '',
  deliveryDate: '',
  birthdayDate: '',
  country: '',
  presents: '',
  photoFile: '',
  gender: '',
  dataProcessing: '',
};
export const emptyFormValues = {
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

export interface IResOfValidation {
  name: string;
  isValid: boolean;
  errorMessage: string;
}

export interface IFormState {
  cardsList: IFormValues[];
  isTouched: boolean;
  formValues: IFormValues;
  errorMessages: IErrorMessages;
  validationErrors: IResOfValidation[];
  photoFile: File | null;
}
