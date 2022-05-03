import React from 'react';
import { render } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { MemoryRouter } from 'react-router-dom';
const data = {
  birth: 'Between ,SA 700, and ,SA 750',
  death: 'Early ,Second Age',
  gender: 'Female',
  hair: '',
  height: '',
  name: 'Ailinel',
  race: 'Human',
  realm: '',
  spouse: 'Orchaldor',
  wikiUrl: 'http://lotr.wikia.com//wiki/Ailinel',
  _id: '5cd99d4bde30eff6ebccfbc3',
};

test('Render character card and items of card', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <CharacterCard data={data} />
    </MemoryRouter>
  );
  const cardEl = getByTestId('character-card');
  const titleEl = getByText(`Date of birth: ${data.birth}`);
  expect(cardEl).toBeInTheDocument();
  expect(titleEl).toBeInTheDocument();
});
