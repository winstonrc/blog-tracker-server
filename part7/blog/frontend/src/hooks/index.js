import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
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
