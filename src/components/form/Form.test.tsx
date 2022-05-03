import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const renderFormComponent = () => {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

describe('Form', () => {
  it('Render form component with all fields', () => {
    renderFormComponent();
    const inputFileEl = screen.getByTestId('photo-file');
    const nameInputEl = screen.getByRole<HTMLInputElement>('textbox', { name: /^name:/i });
    const surnameInputEl = screen.getByRole<HTMLInputElement>('textbox', { name: /^surname:/i });
    const zipCodeInputEl = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: /zip\-code:/i,
    });
    const birthdayInputEl = screen.getByTestId<HTMLInputElement>('birthday-date');
    const deliveryInputEl = screen.getByTestId<HTMLInputElement>('delivery-date');
    const countryInputEl = screen.getByRole('combobox', {
      name: /choose your country:/i,
    });
    const giftsInputEl = screen.getByRole('listbox', {
      name: /list of additional gifts:/i,
    });
    const genderManInputEl = screen.getByRole<HTMLInputElement>('radio', { name: /^man:/i });
    const genderWomanInputEl = screen.getByRole<HTMLInputElement>('radio', { name: /^woman:/i });

    const notificationsInputEl = screen.getByRole<HTMLInputElement>('checkbox', {
      name: /do you want to receive notifications\?/i,
    });
    const dataProcessingInputEl = screen.getByRole<HTMLInputElement>('checkbox', {
      name: /do you agree to data processing\?/i,
    });
    const formEl = screen.getByTestId('form');
    const submitEl = screen.getByTestId('submit');
    const arrOfElems: HTMLElement[] = [
      formEl,
      submitEl,
      inputFileEl,
      nameInputEl,
      surnameInputEl,
      zipCodeInputEl,
      birthdayInputEl,
      deliveryInputEl,
      countryInputEl,
      giftsInputEl,
      genderManInputEl,
      genderWomanInputEl,
      notificationsInputEl,
      dataProcessingInputEl,
    ];
    arrOfElems.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  it('check error messages with empty fields', async () => {
    // renderFormComponent();
    // const inputFileEl = screen.getByTestId('photo-file');
    // const nameInputEl = screen.getByRole<HTMLInputElement>('textbox', { name: /^name:/i });
    // const submitEl = screen.getByTestId('submit');
    // userEvent.type(nameInputEl, 'sometext');
    // userEvent.type(nameInputEl, '');
    // userEvent.click(submitEl);
    // const nameErrorMessage = await screen.findByText(/The field name must be filled in/i);
    // // const nameErrorMessage = await screen.findByTestId('name-error');
    // const surnameErrorMessage = screen.getByText(/The field surname must be filled in/i);
    // const zipCodeErrorMessage = await screen.findByText(/The field zipCode must be filled in/i);
    // const birthdayErrorMessage = await screen.findByText(/You have to choose a birthdayDate/i);
    // const deliveryErrorMessage = await screen.findByText(/You have to choose a deliveryDate/i);
    // const dataProcessingErrorMessage = await screen.findByText(
    //   /Unfortunately, you cannot use this resource until you consent to the processing of your personal data/i
    // );
    // expect(nameErrorMessage).toBeInTheDocument();
    // expect(surnameErrorMessage).toBeInTheDocument();
    // expect(zipCodeErrorMessage).toBeInTheDocument();
    // expect(birthdayErrorMessage).toBeInTheDocument();
    // expect(deliveryErrorMessage).toBeInTheDocument();
    // expect(dataProcessingErrorMessage).toBeInTheDocument();
  });
  it('check add card', () => {
    // renderFormComponent();
    // userEvent.type(nameInputEl, data.name);
    // userEvent.type(surnameInputEl, data.surname);
    // userEvent.type(birthdayInputEl, data.birthdayDate);
    // userEvent.type(zipCodeInputEl, data.zipCode);
    // userEvent.type(deliveryInputEl, data.deliveryDate);
    // userEvent.click(notificationsInputEl);
    // userEvent.click(dataProcessingInputEl);
    // const mockAddCard = jest.fn(addCard);
    // userEvent.click(submitEl);
    // expect(addCard).toBeCalledTimes(1);
    // expect(mockAddCard.mock.results[0].value).toBe(42);
  });
  it('check name validation input less than necessary letters', async () => {
    // renderFormComponent();
    // userEvent.type(nameInputEl, 'aa');
    // userEvent.click(submitEl);
    // const nameErrorMessage = await screen.findByText(/The name should be from 3 to 30 characters/i);
    // expect(nameErrorMessage).toBeInTheDocument();
  });
  it('check name validation input more than necessary letters', async () => {
    // renderFormComponent();
    // userEvent.type(
    //   nameInputEl,
    //   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    // );
    // userEvent.click(submitEl);
    // const nameErrorMessage = await screen.findByText(/The name should be from 3 to 30 characters/i);
    // expect(nameErrorMessage).toBeInTheDocument();
  });
  it('check surname validation input less than necessary letters', async () => {
    // userEvent.type(surnameInputEl, 'aa');
    // userEvent.click(submitEl);
    // const surnameErrorMessage = await screen.findByText(
    //   /The surname should be from 3 to 30 characters/i
    // );
    // expect(surnameErrorMessage).toBeInTheDocument();
  });
  it('check surname validation input more than necessary letters', async () => {
    // userEvent.type(
    //   surnameInputEl,
    //   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    // );
    // userEvent.click(submitEl);
    // const surnameErrorMessage = await screen.findByText(
    //   /The surname should be from 3 to 30 characters/i
    // );
    // expect(surnameErrorMessage).toBeInTheDocument();
  });
  it('check zip-code validation input less than necessary letters', async () => {
    // userEvent.type(zipCodeInputEl, '124');
    // userEvent.click(submitEl);
    // const zipCodeErrorMessage = await screen.findByText(
    //   /The postal code must contain from 5 to 9 characters/i
    // );
    // expect(zipCodeErrorMessage).toBeInTheDocument();
  });
  it('check zip-code validation input more than necessary letters', async () => {
    // userEvent.type(zipCodeInputEl, '12445645434236465646456');
    // userEvent.click(submitEl);
    // const zipCodeErrorMessage = await screen.findByText(
    //   /The postal code must contain from 5 to 9 characters/i
    // );
    // expect(zipCodeErrorMessage).toBeInTheDocument();
  });
  it('check birthday validation input less than today', async () => {
    // const today = new Date().toLocaleDateString(); //? should check, maybe wrong format
    // userEvent.type(birthdayInputEl, today);
    // userEvent.click(submitEl);
    // const birthdayErrorMessage = await screen.findByText(/You cannot be less than 0 years old/i);
    // expect(birthdayErrorMessage).toBeInTheDocument();
  });
  it("check birthday validation input more than 130 yeaar's old", async () => {
    // const today = new Date(); //? should check, maybe wrong format
    // const oneHundredThirtyYearsAgo = new Date(
    //   today.getTime() - 1000 * 60 * 60 * 24 * 365 * 130
    // ).toLocaleDateString();
    // userEvent.type(birthdayInputEl, oneHundredThirtyYearsAgo);
    // userEvent.click(submitEl);
    // const birthdayErrorMessage = await screen.findByText(/You can't be over 130 years old/i);
    // expect(birthdayErrorMessage).toBeInTheDocument();
  });
});
