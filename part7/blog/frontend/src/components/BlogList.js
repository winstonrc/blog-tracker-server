import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs } from '../reducers/blogsReducer';
import BlogFormLabel from './BlogFormLabel';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // fetch blogs from server
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div>
      <BlogFormLabel />

      <br></br>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
