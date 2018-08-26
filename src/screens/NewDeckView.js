/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { TextInput, Button, Headline } from '../components';
import * as actions from '../actions';

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ButtonWrapper = styled.View`
  margin: 10px;
  margin-top: 30px;
`;

type Props = {
  saveDeckTitle: (title: string) => void,
  navigation: Object,
};
type State = {
  title: string,
};

class NewDeckView extends React.Component<Props, State> {
  static navigationOptions = {};

  state = {
    title: '',
  };

  handleSubmit = () => {
    const { title } = this.state;
    this.props.saveDeckTitle(title);

    this.props.navigation.navigate('NewQuestionView', { title });

    this.setState({ title: '' });
  };

  render() {
    return (
      <Wrapper behavior="padding">
        <Headline>What is the title of your new deck?</Headline>
        <TextInput
          placeholder="Deck Title"
          onChangeText={text => this.setState({ title: text })}
        />
        <ButtonWrapper>
          <Button onPress={this.handleSubmit}>Submit</Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default connect(null, actions)(NewDeckView);
