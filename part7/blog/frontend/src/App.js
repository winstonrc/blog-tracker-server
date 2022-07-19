import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationColor, setNotificationColor] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  // fetch blogs from server
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // check for logged in user when page loads
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotificationColor("green");
      setNotification(`Welcome ${user.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotificationColor("red");
      setNotification("Invalid credentials");
      setPassword("");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedInUser");
      await blogService.setToken("");
      setUser(null);
    } catch (error) {
      setNotificationColor("red");
      setNotification("Unable to logout");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    // Remove button only shows up after refreshing page
    try {
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      console.log("response.user", response.user.username);
      console.log("user", user);
      setNotificationColor("green");
      setNotification(
        `Added ${blogObject.title} by ${blogObject.author} to the list`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      errorHandler(blogObject);
      console.log(error.message);
    }
  };

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : blog)));
    } catch (error) {
      setNotificationColor("red");
      setNotification("Unable to remove blog");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const removeBlog = async (blog) => {
    console.log(blog);
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        setNotificationColor("red");
        setNotification("Unable to remove blog");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };

  const errorHandler = (blogObject) => {
    if (blogObject.title === "") {
      setNotificationColor("red");
      setNotification("Error: A title is required");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }

    if (blogObject.url === "") {
      setNotificationColor("red");
      setNotification("Error: An URL is required");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} color={notificationColor} />
      {user === null ? (
        // if user is logged out
        loginForm()
      ) : (
        // if user is logged in
        <div>
          <p>
            Logged in as {user.name}{" "}
            {
              <button className="logoutButton" onClick={handleLogout}>
                logout
              </button>
            }
          </p>
          {blogForm()}
          <br></br>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                updateBlog={updateBlog}
                deleteBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
