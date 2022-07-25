import { forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';
import { useBoolean } from '../hooks';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const visible = useBoolean();

  const hideWhenVisible = { display: visible.value ? 'none' : '' };
  const showWhenVisible = { display: visible.value ? '' : 'none' };

  const toggleVisibility = () => {
    visible.toggle();
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={toggleVisibility}
          className="addBlogButton"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <br></br>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
