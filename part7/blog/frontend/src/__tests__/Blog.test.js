import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('<Note />', () => {
  let container;
  const mockHandler = jest.fn();

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Charles Dickens',
    url: 'www.google.com',
  };

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} />
    ).container;
  });

  test('renders content', () => {
    const titleElement = screen.getByText(
      'Component testing is done with react-testing-library'
    );
    expect(titleElement).toBeDefined();

    const authorElement = screen.queryByText('Charles Dickens');
    expect(authorElement).toBeNull();

    const urlElement = screen.queryByText('www.google.com');
    expect(urlElement).toBeNull();

    const likesElement = screen.queryByText(0);
    expect(likesElement).toBeNull();
  });

  test('clicking the button displays additional details', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('expand');
    await user.click(button);

    const authorElement = screen.queryByText('Charles Dickens');
    expect(authorElement).toBeDefined();

    const urlElement = screen.queryByText('www.google.com');
    expect(urlElement).toBeDefined();

    const likesElement = screen.queryByText(0);
    expect(likesElement).toBeDefined();
  });

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup();
    const expandButton = screen.getByText('expand');
    await user.click(expandButton);
    const likeButton = container.querySelector('.addLikeButton');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
