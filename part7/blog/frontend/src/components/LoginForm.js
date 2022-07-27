import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { login } from '../reducers/userReducer';
import { TextField, Button } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" {...username.props} />
        </div>
        <br></br>
        <div>
          <TextField label="password" type="password" {...password.props} />
        </div>
        <br></br>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
