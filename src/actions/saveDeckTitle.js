/* @flow */
import { AsyncStorage } from 'react-native';

import type { Dispatch, Deck } from '../utils/types';

export const saveDeckTitle = (title: $PropertyType<Deck, 'title'>) => async (
  dispatch: Dispatch,
) => {
  const deck: Deck = { title, questions: [] };
  AsyncStorage.mergeItem('decks', JSON.stringify({
    [deck.title]: deck,
  }));

  dispatch({ type: 'SAVE_DECK_TITLE', payload: deck });
};
