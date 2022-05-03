import React from 'react';
import { render, screen } from '@testing-library/react';
import FormPage from './form';
import userEvent from '@testing-library/user-event';
import { mock } from './formTestMock';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

describe('Form page', () => {
  beforeEach(() => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
  });
  it('Render form page', () => {
    const formPageEl = screen.getByTestId('form-page');
    const formEl = screen.getByTestId('form');
    const cardListEl = screen.getByTestId('card-list');
    expect(formEl).toBeInTheDocument();
    expect(formPageEl).toBeInTheDocument();
    expect(cardListEl).toBeInTheDocument();
  });
  it('add new card', async () => {
    const submitBtnEl = screen.getByRole('button', {
      name: /submit/i,
    });
    // const inputFileEl = screen.getByText('choose file');

    const nameInputEl = screen.getByRole<HTMLInputElement>('textbox', { name: /^name:/i });
    const surnameInputEl = screen.getByRole<HTMLInputElement>('textbox', { name: /^surname:/i });
    const zipCodeInputEl = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: /zip\-code:/i,
    });
    const birthdayInputEl = screen.getByTestId<HTMLInputElement>('birthday-date');
    const deliveryInputEl = screen.getByTestId<HTMLInputElement>('delivery-date');
    // const countryInputEl = screen.getByRole('combobox', {
    //   name: /choose your country:/i,
    // });
    // const giftsInputEl = screen.getByRole('listbox', {
    //   name: /list of additional gifts:/i,
    // });
    const genderManInputEl = screen.getByRole<HTMLInputElement>('radio', { name: /^man:/i });
    const genderWomanInputEl = screen.getByRole<HTMLInputElement>('radio', { name: /^woman:/i });

    const notificationsInputEl = screen.getByRole<HTMLInputElement>('checkbox', {
      name: /do you want to receive notifications\?/i,
    });
    const dataProcessingInputEl = screen.getByRole<HTMLInputElement>('checkbox', {
      name: /do you agree to data processing\?/i,
    });

    userEvent.type(nameInputEl, mock.name);
    userEvent.type(surnameInputEl, mock.surname);
    userEvent.type(birthdayInputEl, mock.birthdayDate);
    userEvent.type(zipCodeInputEl, mock.zipCode);
    userEvent.type(deliveryInputEl, mock.deliveryDate);
    userEvent.click(notificationsInputEl);
    userEvent.click(dataProcessingInputEl);

    // userEvent.click(submitBtnEl);
    // expect(
    //   await screen.findByRole('button', {
    //     name: /submit/i,
    //   })
    // ).toBeDisabled();
    // expect(await screen.findByText(/The card was created successfully!/i)).toBeInTheDocument();
    // expect(await screen.findByTestId('form-card')).toBeInTheDocument();

    // The card was created successfully!
  });
});
