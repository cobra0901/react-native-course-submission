/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import * as actions from '../actions';
import { Card } from '../components';
import type { Deck } from '../utils/types';

const Wrapper = styled.ScrollView`
  margin-top: 10px;
`;
const Text = styled.Text``;

type NavigationState = {
  params: {},
};

type Props = {
  decks: { [key: $PropertyType<Deck, 'title'>]: Deck },
  fetchDecks: () => void,
  navigation: NavigationScreenProp<NavigationState>,
};

type State = {};

class DeckListView extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: 'Decks',
    headerBackTitle: null,
    headerLeft: <View />,
    headerStyle: {
      marginTop: -Constants.statusBarHeight,
    },
  });

  componentDidMount() {
    this.props.fetchDecks();
  }

  state = {};

  handleCardPress = ({ title }: Deck) => {
    this.props.navigation.navigate('IndividualDeckView', { title });
  };

  render() {
    return (
      <Wrapper>
        {Object.keys(this.props.decks).map(key => (
          <Card
            key={key}
            {...this.props.decks[key]}
            onPress={() => this.handleCardPress(this.props.decks[key])}
          />
        ))}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks,
  };
};

export default connect(mapStateToProps, actions)(DeckListView);
