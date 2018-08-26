/* @flow */
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Constants } from 'expo';
import styled from 'styled-components/native';

import {
  DeckListView,
  NewDeckView,
  IndividualDeckView,
  NewQuestionView,
  QuizView,
  ScoreView,
} from './src/screens';
import reducers from './src/reducers';

import { Color } from './src/utils';
import { setLocalNotification } from './src/utils/notification';

const Tabs = TabNavigator({
  DeckListFlow: {
    screen: StackNavigator({
      DeckListView: {
        screen: DeckListView,
      },
      IndividualDeckView: {
        screen: IndividualDeckView,
      },
      AddCardView: {
        screen: NewQuestionView,
      },
      QuizView: {
        screen: QuizView,
      },
      ScoreView: {
        screen: ScoreView,
      },
    }),
  },
  CreateDeckFlow: {
    screen: StackNavigator(
      {
        NewDeckView: {
          screen: NewDeckView,
          navigationOptions: () => ({
            title: 'New Deck',
            header: null,
            headerBackTitle: null,
          }),
        },
        NewQuestionView: {
          screen: NewQuestionView,
        },
      },
      { headerMode: 'screen' },
    ),
  },
});

const middleware = [reduxThunk];
const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? require('redux-devtools-extension').composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
      )
    : applyMiddleware(...middleware),
);

const StatusBarBackground = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f7f7f7;
`;

type Props = {};
type State = {};

export default class App extends React.Component<Props, State> {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View
            style={{ height: Constants.statusBarHeight, position: 'relative' }}
          >
            <StatusBar translucent barStyle="dark-content" />
            <StatusBarBackground />
          </View>
          <Tabs />
        </View>
      </Provider>
    );
  }
}
