import React, { useRef } from 'react';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogFormLabel = () => {
  const blogFormRef = useRef();

  return (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm
        onCreateSuccess={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  );
};

export default BlogFormLabel;
