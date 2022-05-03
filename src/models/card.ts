export interface ICard {
  id: number;
  imgUrl: string;
  name: string;
  tegs: string;
  author: string;
  likes: number;
  dislikes: number;
  views: number;
}

export enum typeOfCards {
  movie = 'movie',
  book = 'book',
  character = 'character',
}

export interface IBookCard {
  name: string;
  _id: string;
}
export interface IMovieCard {
  academyAwardNominations: number;
  academyAwardWins: number;
  boxOfficeRevenueInMillions: number;
  budgetInMillions: number;
  name: string;
  rottenTomatoesScore: number;
  runtimeInMinutes: number;
  _id: string;
}
export interface ICharacterCard {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
}

export type card = IBookCard | IMovieCard | ICharacterCard;

export interface ICardsState {
  searchedList: card[];
  isLoading: boolean;
  isError: boolean;
  typeInfo: typeOfCards;
  pageNumber: number;
  totalPages: number;
  numberOfResultsPerPage: number;
  requestString: string;
}
