import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, severity } = notification;

  if (!message) {
    return null;
  }

  return (
    <div className="notification">
      {message && <Alert severity={severity}>{message}</Alert>}
    </div>
  );
};

export default Notification;
