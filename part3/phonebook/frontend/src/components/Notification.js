const Notification = ({ message, greenMessage }) => {
    let messageColor = 'green'
    if (greenMessage) {
        messageColor = 'green'
    } else messageColor = 'red' 

    const notificationStyle = {
        color: messageColor,
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification