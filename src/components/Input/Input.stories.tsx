import React from 'react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input
};

export const simpleInput = (): JSX.Element => (
  <Input label="some input" inputProps={{ placeholder: 'input element' }} />
);
