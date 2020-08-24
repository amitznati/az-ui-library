import React from 'react';
export interface InputProps {
  id?: string;
  label?: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  formGroupProps?: React.HTMLProps<HTMLDivElement>;
}
