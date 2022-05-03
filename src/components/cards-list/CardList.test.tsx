import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './CardsList';
import { listMock } from './mock';
import { typeOfCards } from '../../models/card';
import { MemoryRouter } from 'react-router-dom';

const renderCardList = () => {
  return render(
    <MemoryRouter>
      <CardList cardList={listMock} typeCard={typeOfCards.movie} />
    </MemoryRouter>
  );
};
describe('CardList', () => {
  it('Render card list component', () => {
    renderCardList();
    const cardListEl = screen.getByTestId('cardList');
    expect(cardListEl).toBeInTheDocument();
  });
  it('Render cards in card list', () => {
    renderCardList();
    const cardListEl = screen.getByTestId('cardList');
    expect(cardListEl.children).toHaveLength(listMock.length);
  });
});
