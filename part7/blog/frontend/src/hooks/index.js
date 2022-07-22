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
    props: {
      type,
      value,
      onChange,
    },
    reset,
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
