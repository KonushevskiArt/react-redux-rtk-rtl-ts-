import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from './MovieCard';
import { MemoryRouter } from 'react-router-dom';

const data = {
  academyAwardNominations: 1,
  academyAwardWins: 0,
  boxOfficeRevenueInMillions: 956,
  budgetInMillions: 250,
  name: 'The Battle of the Five Armies',
  rottenTomatoesScore: 60,
  runtimeInMinutes: 144,
  _id: '5cd95395de30eff6ebccde5a',
};

test('Render movie card and items of card', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <MovieCard data={data} />
    </MemoryRouter>
  );
  const cardEl = getByTestId('movie-card');
  const titleEl = getByText(`Budget: ${data.budgetInMillions}`);
  expect(cardEl).toBeInTheDocument();
  expect(titleEl).toBeInTheDocument();
});
