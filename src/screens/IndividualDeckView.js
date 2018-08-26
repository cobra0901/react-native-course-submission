/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import { Card, Button } from '../components';
import type { Deck } from '../utils/types';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonWrapper = styled.View`
  margin-top: 25px;
  margin-bottom: 20px;
`;

const Text = styled.Text``;

type NavigationState = {
  params: {
    title: string,
  },
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  selectedDeck: Deck,
};
type State = {};

class IndividualDeckView extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      tabBarVisible: false,
      headerStyle: {
        marginTop: -Constants.statusBarHeight,
      },
      headerBackTitle: null,
    };
  };

  state = {};

  render() {
    const { title } = this.props.navigation.state.params;
    return (
      <Wrapper>
        <Card {...this.props.selectedDeck} />
        <ButtonWrapper>
          <Button
            inverted
            onPress={() => {
              this.props.navigation.navigate('AddCardView', { title });
            }}
          >
            Add Card
          </Button>
        </ButtonWrapper>
        <Button
          onPress={() => {
            this.props.navigation.navigate('QuizView', { title });
          }}
        >
          Start Quiz
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { selectedDeck: state.decks[props.navigation.state.params.title] };
};

export default connect(mapStateToProps)(IndividualDeckView);
