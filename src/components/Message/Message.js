const dateToMessageStringTime = (time) => time.toTimeString().split(' ')[0];

const Message = ({ message, messagesIdsWithAvatars, userId, conversationalistAvatarUrl }) => {
    const showAvatar = messagesIdsWithAvatars.includes(message.messageId);

    return (
        <li key={message.messageId}
            className={userId === message.senderId ? "Message-right" : "Message-left"}
        >
            {showAvatar ?
                <img className="Avatar" src={conversationalistAvatarUrl} alt='avatar' />
                : <div className="Avatar" />
            }
            <div className="Message-body">
                <p className="Message-text">
                    {message.text}
                </p>
                <p className="Message-time">
                    {dateToMessageStringTime(message.sentTime)}
                </p>
            </div>
        </li>
    )
}

export default Message;