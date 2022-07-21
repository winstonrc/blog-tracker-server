const loggedInUserKey = 'loggedInUser';

const save = (user) => {
  window.localStorage.setItem(loggedInUserKey, JSON.stringify(user));
};

const get = () => {
  const loggedInUserJSON = window.localStorage.getItem(loggedInUserKey);
  if (!loggedInUserJSON) {
    return null;
  }

  return JSON.parse(loggedInUserJSON);
};

const remove = () => {
  window.localStorage.removeItem(loggedInUserKey);
};

const user = { save, get, remove };

export default user;
