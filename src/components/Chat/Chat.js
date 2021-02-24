import React, { Component } from 'react';
import { messagesApi } from '../../apiCalls'
import ChatFooter from '../ChatFooter/ChatFooter';
import Message from '../Message/Message';
import './Chat.css';

class Chat extends Component {
  // since aplication is small the easiest way is to store data in a classic way in the state
  state = {
    // using object instead of array to avoid duplicates on messages merging
    messages: {},
    loading: false,
    error: null,
    draft: '',
    sendingMessage: false,
  }

  static getLastMessageId(messagesDictionary) {
    const sortedMessageIds = Object.keys(messagesDictionary);
    const lastId = sortedMessageIds[sortedMessageIds.length - 1];
    return lastId ? Number(lastId) : -1;
  }

  componentDidMount() {
    this.messagesUpdater = setInterval(() => this.fetchNewMessages(), 1000);

    this.setState(
      { loading: true },
      () => messagesApi.getAll()
        .then(messages => this.setState({ messages, loading: false }))
        .catch(error => this.setState({ error, loading: false }))
    )
  }

  componentWillUnmount() {
    clearInterval(this.messagesUpdater);
  }

  fetchNewMessages = () => {
    const lastMessageId = Chat.getLastMessageId(this.state.messages);

    messagesApi
      .checkUpdates(lastMessageId)
      .then(messages => this.setState(
        oldState => ({
          messages: { ...messages, ...oldState.messages },
        })
      ))
      .catch(error => this.setState({ error }))
  };
 
  handleInputChange = (event) => {
    this.setState({ draft: event.target.value });
  };

  sendMessage = (event) => {
    const messageText = this.state.draft;
    
    event.preventDefault();
    this.setState(
      { sendingMessage: true },
      () => messagesApi.postNew(messageText)
        .then(message => this.setState(
          oldState => ({
            messages: { [message.messageId]: message, ...oldState.messages },
            sendingMessage: false,
            draft: '',
          })))
        .catch(error => this.setState({ error, sendingMessage: false }))
    )
  };

  getMessagesIdsWithAvatars = (reversedMessages) => {
    const { conversationalistId, userId } = this.props;
    
    let previousOwnerId = userId;
    const messagesIdsWithAvatars = [];

    for (let message of reversedMessages) {
      if (message.senderId === conversationalistId && previousOwnerId !== conversationalistId) {
        messagesIdsWithAvatars.push(message.messageId)
      }
      previousOwnerId = message.senderId;
    }

    return messagesIdsWithAvatars;
  }

  render() {
    const { loading, draft, sendingMessage } = this.state; 
    const { userId, conversationalistAvatarUrl, chatTitle } = this.props;

    const reversedMessages = Object.values(this.state.messages).reverse();
    const messagesIdsWithAvatars = this.getMessagesIdsWithAvatars(reversedMessages);

    return (
      <div className="Chat">
        <div className="Header">
          <img className="Avatar" src={conversationalistAvatarUrl} alt='avatar' />
          <span>{ chatTitle }</span>
        </div>
        <ul className="Mesages-reversed-contener">
          {loading && <li>Loading...</li>}
          {!loading && (reversedMessages.map(message =>
            <Message
              message={ message }
              messagesIdsWithAvatars={messagesIdsWithAvatars}
              userId={userId}
              conversationalistAvatarUrl={conversationalistAvatarUrl}
            />
          ))}
        </ul>
        <ChatFooter
          draft={draft}
          sendMessage={this.sendMessage}
          sendingMessage={sendingMessage}
          handleChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Chat;
