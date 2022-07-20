import { forwardRef, useImperativeHandle } from 'react';
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
        <button onClick={toggleVisibility} className='addBlogButton'>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
