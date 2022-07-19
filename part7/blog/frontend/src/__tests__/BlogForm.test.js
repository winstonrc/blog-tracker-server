import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const blog = {
    title: 'testing a form...',
    author: 'myself',
    url: 'www.google.com',
    likes: 0,
  };

  let container = render(<BlogForm createBlog={createBlog} />).container;

  //   const input = screen.getByRole('textbox')
  const titleInput = container.querySelector('.titleInput');
  const authorInput = container.querySelector('.authorInput');
  const urlInput = container.querySelector('.urlInput');
  const submitButton = container.querySelector('.form');

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(blog);
});
