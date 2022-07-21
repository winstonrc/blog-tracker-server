import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username &nbsp;
          <input name='Username' {...username.props} />
        </div>

        <div>
          Password &nbsp;&nbsp;
          <input name='Password' {...password.props} />
        </div>

        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
