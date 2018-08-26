/* @flow */
import { AsyncStorage } from 'react-native';

import type { Dispatch, Deck } from '../utils/types';

export const fetchDecks = () => async (dispatch: Dispatch) => {
  const decks: {
    [key: $PropertyType<Deck, 'title'>]: Deck,
  } = JSON.parse(await AsyncStorage.getItem('decks'));

  dispatch({
    type: 'FETCH_DECKS',
    payload: decks,
  });
};
