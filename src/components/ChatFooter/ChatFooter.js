const ChatFooter = ({ draft, sendMessage, sendingMessage, handleChange }) => {
    
    return (
        <div className="Input-container">
          <textarea className="Message-input"
            rows={4}
            value={draft}
            onChange={handleChange}
            placeholder='Type a message...'
          />
          <button disabled={!draft || sendingMessage} onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatFooter;