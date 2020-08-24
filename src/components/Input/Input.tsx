import React from 'react';

import { InputProps } from './Input.types';

import './Input.scss';

const Input: React.FC<InputProps> = ({
  id = Date.now().toString(),
  label,
  inputProps,
  formGroupProps
}) => {
  return (
    <div className="form__group" {...formGroupProps}>
      <input className="form__input" id={id} {...inputProps} />
      {label && (
        <label htmlFor={id} className="form__label">
          {label}
        </label>
      )}
    </div>
  );
};
export default Input;
