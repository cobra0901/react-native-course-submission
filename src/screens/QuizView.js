/* @flow */
import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components/native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { Color, clearLocalNotification, setLocalNotification } from '../utils';
import { Link, Button, Headline } from '../components';
import type { Deck } from '../utils/types';

const Wrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const Remaining = styled.Text`
  align-self: flex-start;
  font-size: 20px;
  margin-left: 25px;
  margin-bottom: 20px;
`;

type NavigationState = {
  params: {
    title: string,
  },
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  deck: Deck,
};

type State = {
  answerRevealed: boolean,
  activeQuestionIndex: number,
  correctAnswers: number,
};

class QuizView extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: 'Quiz',
    tabBarVisible: false,
    headerLeft: <View />,
    headerStyle: {
      marginTop: -Constants.statusBarHeight,
    },
  });

  state = {
    answerRevealed: false,
    activeQuestionIndex: 0,
    correctAnswers: 0,
  };

  toggleAnswerQuestionLink = () => {
    this.setState(
      R.evolve({
        answerRevealed: R.not,
      }),
    );
  };

  handleAnswer = async (answer: boolean) => {
    const { activeQuestionIndex } = this.state;

    if (answer) {
      await this.setState(
        R.evolve({
          correctAnswers: R.inc,
          activeQuestionIndex: R.inc,
        }),
      );
    } else {
      this.setState(R.evolve({ activeQuestionIndex: R.inc }));
    }

    if (activeQuestionIndex + 1 === this.props.deck.questions.length) {
      const score = (this.state.correctAnswers / this.props.deck.questions.length * 100).toFixed(0);

      // last question
      this.props.navigation.navigate('ScoreView', {
        score: `${score}%`,
        title: this.props.navigation.state.params.title,
      });

      clearLocalNotification().then(setLocalNotification());
    }
  };

  render() {
    const card = this.props.deck.questions[this.state.activeQuestionIndex];
    if (!card) return null;
    return (
      <Wrapper>
        <Remaining>{`${this.props.deck.questions.length -
          this.state.activeQuestionIndex}/${
          this.props.deck.questions.length
        }`}</Remaining>
        <Headline>
          {this.state.answerRevealed ? card.answer : card.question}
        </Headline>
        <Link onPress={this.toggleAnswerQuestionLink}>
          {this.state.answerRevealed ? 'Question' : 'Answer'}
        </Link>
        <Button
          style={{ width: 125, marginBottom: 10 }}
          textStyle={{ textAlign: 'center' }}
          onPress={() => this.handleAnswer(true)}
          context="success"
        >
          Correct
        </Button>
        <Button
          style={{ width: 125 }}
          textStyle={{ textAlign: 'center' }}
          onPress={() => this.handleAnswer(false)}
          context="danger"
        >
          Incorrect
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { deck: state.decks[props.navigation.state.params.title] };
};

export default connect(mapStateToProps)(QuizView);
