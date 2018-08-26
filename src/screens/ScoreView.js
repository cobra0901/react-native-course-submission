/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Constants } from 'expo';

import { Headline, Button } from '../components';

const Wrapper = styled.View`
  align-items: center;
  margin-top: 50px;
`;

const Text = styled.Text`
  font-size: 20px;
`;

type NavigationState = {
  params: {
    score: string,
    title: string,
  },
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
};

type State = {};

class ScoreView extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: 'Score',
    tabBarVisible: false,
    headerLeft: <View />,
    headerStyle: {
      marginTop: -Constants.statusBarHeight,
    },
  });

  state = {};

  render() {
    return (
      <Wrapper>
        <Text>Your score:</Text>
        <Headline>{this.props.navigation.state.params.score}</Headline>
        <Button
          onPress={() => {
            this.props.navigation.navigate('QuizView', {
              title: this.props.navigation.state.params.title,
            });
          }}
        >
          Restart quiz
        </Button>
        <Button
          inverted
          onPress={() => {
            this.props.navigation.navigate('IndividualDeckView', {
              title: this.props.navigation.state.params.title,
            });
          }}
        >
          {`Back to ${this.props.navigation.state.params.title} deck`}
        </Button>
        <Button
          inverted
          onPress={() => {
            this.props.navigation.navigate('DeckListView');
          }}
        >
          Back to deck list
        </Button>
      </Wrapper>
    );
  }
}

export default ScoreView;
