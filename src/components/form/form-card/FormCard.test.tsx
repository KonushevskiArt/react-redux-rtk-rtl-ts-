import React from 'react';
import { render, screen } from '@testing-library/react';
import FormCard from './FormCard';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

describe('Header', () => {
  const mock = {
    birthdayDate: '2022-03-29',
    country: 'India',
    dataProcessing: 'true',
    deliveryDate: '2022-04-05',
    gender: 'woman',
    name: 'sdfsdf',
    notifications: 'true',
    photoFile: null,
    presents: ['Gift1', 'Gift2', 'Gift3', 'Gift4'],
    surname: 'asdfasdf',
    zipCode: '24234234',
  };

  const renderFormCard = () => {
    const store = setupStore();
    return render(
      <Provider store={store}>
        <FormCard data={mock} />
      </Provider>
    );
  };

  it('render form-card component', () => {
    renderFormCard();
    const cardEl = screen.getByTestId('form-card');
    const imgEl = screen.getByTestId('card-image');
    const titleEl = screen.getByText(`${mock.name} ${mock.surname}`);
    const zipCodeEl = screen.getByText(mock.zipCode);
    const birthdayEl = screen.getByText(mock.birthdayDate);
    const deliveryEl = screen.getByText(mock.deliveryDate);
    const countryEl = screen.getByText(mock.country);
    const genderEl = screen.getByText(mock.gender);
    const giftsEl = screen.getByTestId('card-gifts');
    const notificationsEl = screen.getByTestId('card-notifications');

    expect(cardEl).toBeInTheDocument();
    expect(countryEl).toBeInTheDocument();
    expect(genderEl).toBeInTheDocument();
    expect(giftsEl).toBeInTheDocument();
    expect(notificationsEl).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
    expect(zipCodeEl).toBeInTheDocument();
    expect(birthdayEl).toBeInTheDocument();
    expect(deliveryEl).toBeInTheDocument();
    expect(titleEl).toBeInTheDocument();
  });
});
