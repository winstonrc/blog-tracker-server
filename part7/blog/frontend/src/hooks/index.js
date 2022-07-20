import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useLabel = (type, defaultValue, toggledValue) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => {
    if (value === defaultValue) {
      setValue(toggledValue);
    } else {
      setValue(defaultValue);
    }
  };

  return {
    type,
    value,
    toggle,
  };
};

export const useBoolean = (type) => {
  const [value, setValue] = useState(false);

  const toggle = () => {
    if (value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
  };

  return {
    type,
    value,
    toggle,
  };
};
