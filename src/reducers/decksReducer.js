/* @flow */
import { AsyncStorage } from 'react-native';
import type { Deck, Action } from '../utils/types';

type State = {
  [key: $PropertyType<Deck, 'title'>]: Deck,
};

export default function(state: State = {}, action: Action) {
  switch (action.type) {
    case 'FETCH_DECKS':
      return Object.assign({}, state, action.payload);
    case 'FETCH_DECK':
      return { ...state, [action.payload.title]: action.payload };
    case 'SAVE_DECK_TITLE':
      return { ...state, [action.payload.title]: action.payload };
    case 'ADD_CARD_TO_DECK':
      return { ...state, [action.payload.title]: action.payload };
    default:
      return state;
  }
}
