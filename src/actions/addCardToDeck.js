/* @flow */
import { AsyncStorage } from 'react-native';

import type { Dispatch, Deck, Question } from '../utils/types';

export const addCardToDeck = (
  title: $PropertyType<Deck, 'title'>,
  card: Question,
) => async (dispatch: Dispatch) => {
  const decks: {
    [key: $PropertyType<Deck, 'title'>]: Deck,
  } = JSON.parse(await AsyncStorage.getItem('decks'));

  const deck = decks[title];
  deck.questions.push(card);

  AsyncStorage.mergeItem(
    'decks',
    JSON.stringify({
      [deck.title]: deck,
    }),
  );

  dispatch({ type: 'ADD_CARD_TO_DECK', payload: deck });
};
