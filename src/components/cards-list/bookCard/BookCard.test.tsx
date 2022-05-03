import React from 'react';
import { render } from '@testing-library/react';
import BookCard from './BookCard';
import { MemoryRouter } from 'react-router-dom';

const data = {
  name: 'The Fellowship Of The Ring',
  _id: '5cf5805fb53e011a64671582',
};

test('Render book card and items of card', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <BookCard data={data} />
    </MemoryRouter>
  );
  const cardEl = getByTestId('book-card');
  const titleEl = getByText(`Name: ${data.name}`);
  expect(cardEl).toBeInTheDocument();
  expect(titleEl).toBeInTheDocument();
});
