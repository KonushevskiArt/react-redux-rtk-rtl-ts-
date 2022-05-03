import { IBookCard, ICard, ICharacterCard, IMovieCard, typeOfCards } from '../../../models/card';
import BookCard from '../bookCard/BookCard';
import CharacterCard from '../characterCard/CharacterCard';
import MovieCard from '../movieCard/MovieCard';

export const matchTypeOfCard = (
  el: ICard | IBookCard | ICharacterCard | IMovieCard,
  typeOfCard: typeOfCards
) => {
  switch (typeOfCard) {
    case 'movie':
      if ('_id' in el && 'academyAwardWins' in el) {
        return <MovieCard key={el._id} data={el}></MovieCard>;
      }
    case 'book':
      if ('_id' in el) {
        return <BookCard key={el._id} data={el}></BookCard>;
      }
    case 'character':
      if ('_id' in el && 'gender' in el) {
        return <CharacterCard key={el._id} data={el}></CharacterCard>;
      }
  }
};
