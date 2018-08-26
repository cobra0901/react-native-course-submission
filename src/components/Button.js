/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';
import * as R from 'ramda';

import { Color } from '../utils';

const getBackgroundColor = R.cond([
  [R.propEq('inverted', true), R.always('transparent')],
  [R.propEq('context', 'success'), R.always(Color.SUCCESS)],
  [R.propEq('context', 'danger'), R.always(Color.DANGER)],
  [R.T, R.always(Color.BLACK)],
]);

const Wrapper = styled.TouchableOpacity`
  background-color: ${getBackgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  border-width: ${props => (props.inverted ? '1px' : '0')};
  border-color: ${Color.BLACK};
`;
const Text = styled.Text`
  color: ${props => (props.inverted ? Color.BLACK : Color.WHITE)};
  font-size: 20px;
`;

type Props = {
  children: string,
  onPress?: () => void,
  inverted: boolean,
  context?: 'success' | 'danger',
  style?: Object,
  textStyle?: Object,
};

const Button = ({ children, onPress, inverted, context, style, textStyle }: Props) => {
  return (
    <Wrapper
      style={style}
      inverted={inverted}
      context={context}
      onPress={onPress}
    >
      <Text style={textStyle} inverted={inverted}>{children}</Text>
    </Wrapper>
  );
};

Button.defaultProps = {
  inverted: false,
};

export { Button };
