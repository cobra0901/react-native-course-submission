/* @flow */
import * as React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
  font-size: 48px;
  text-align: center;
  margin-bottom: 24px;
`;

type Props = {
  children: string,
};

const Headline = ({ children }: Props) => {
  return (
    <Text>{children}</Text>
  );
};

export { Headline };
