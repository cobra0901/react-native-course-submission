/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';

import { Color } from '../utils';
import type { Deck } from '../utils/types';

const Wrapper = styled.TouchableOpacity`
  border: 1px solid ${Color.BLACK};
  height: 150px;
  margin: 10px;
  margin-top: 0;
  padding: 10px
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 5px;
`;

const Description = styled.Text`
  color: ${Color.GRAY};
`;

type Props = Deck & {
  onPress?: () => void,
};

const Card = ({ title, questions, onPress }: Props) => {
  return (
    <Wrapper onPress={onPress}>
      <Text>{title}</Text>
      <Description>{questions.length} cards</Description>
    </Wrapper>
  );
};

export { Card };
