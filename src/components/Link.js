/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';

import { Color } from '../utils';

const Wrapper = styled.TouchableOpacity``;
const Text = styled.Text`
  color: ${Color.RED};
  font-weight: 600;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

type Props = {
  children: string,
  onPress?: () => void,
};

const Link = ({ children, onPress }: Props) => {
  return (
    <Wrapper onPress={onPress}>
      <Text>{children}</Text>
    </Wrapper>
  );
};

export { Link };
