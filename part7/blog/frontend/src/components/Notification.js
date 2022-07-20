import { useSelector } from 'react-redux';

// fix color handling ({ color })
const Notification = ({ color }) => {
  const notification = useSelector((state) => state.notification);

  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className='notification' style={notificationStyle}>
      {notification}
    </div>
  );
};

export default Notification;
