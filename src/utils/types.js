/* @flow */
export type Question = {
  question: string,
  answer: string,
};

export type Deck = {
  title: string,
  questions: Array<Question>,
};

type FetchDecksAction = {
  type: 'FETCH_DECKS',
  payload: { [key: $PropertyType<Deck, 'title'>]: Deck },
};

type FetchDeckAction = {
  type: 'FETCH_DECK',
  payload: Deck,
};

type SaveDeckTitleAction = {
  type: 'SAVE_DECK_TITLE',
  payload: Deck,
};

type AddCardToDeckAction = {
  type: 'ADD_CARD_TO_DECK',
  payload: Deck,
};

export type Action = FetchDecksAction | FetchDeckAction | SaveDeckTitleAction | AddCardToDeckAction;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
// type GetState = () => State;
type GetState = () => Object;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
