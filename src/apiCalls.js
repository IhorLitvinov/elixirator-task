const currentUserId = 0;
const otherUserId = 1;

const mockInitialData = {
    1: { messageId: 1, senderId: otherUserId, text: 'Message for me', sentTime: new Date(2021, 2, 22, 23, 0) },
    2: { messageId: 2, senderId: otherUserId, text: 'Yet another message', sentTime: new Date(2021, 2, 22, 23, 20) },
    3: { messageId: 3, senderId: currentUserId, text: 'My answer', sentTime: new Date(2021, 2, 23, 1, 4) },
    4: { messageId: 4, senderId: otherUserId, text: 'Answer to my answer', sentTime: new Date(2021, 2, 23, 9, 0) },
    5: { messageId: 5, senderId: currentUserId, text: 'la la la', sentTime: new Date(2021, 2, 23, 9, 10) },
    6: { messageId: 6, senderId: currentUserId, text: 'again, la la la', sentTime: new Date(2021, 2, 23, 9, 11) },
}

let messagesCount = Object.keys(mockInitialData).length;

const mockCreateNewMessage = (messageText) => {
    messagesCount++;

    const isMyMessage = Boolean(messageText);

    if (isMyMessage) {
        return {
            messageId: messagesCount,
            senderId: currentUserId,
            text: messageText,
            sentTime: new Date()
        };
    }

    const randomText = Math.random().toString(36).substring(7);
    
    return {
        messageId: messagesCount,
        senderId: otherUserId,
        text: "I'm writing random text at random time: " + randomText,
        sentTime: new Date()
    };
};

const NEW_MESSAGE_PROBABILITY = 0.05;

const mockMessagesUpdate = () => {
    const shouldGenerateNewMessage = Math.random() < NEW_MESSAGE_PROBABILITY;

    if (!shouldGenerateNewMessage) {
        return {};
    }

    const newMessage = mockCreateNewMessage();

    return {[newMessage.messageId]: newMessage}
};

export const messagesApi = {

    getAll() {
        return new Promise(
            (resolve, _) => setTimeout(() => resolve(mockInitialData), 1000)
        )
    },

    checkUpdates(lastMessageId) {
        return new Promise(
            (resolve, _) => {
                const messagesUpdate = mockMessagesUpdate();
                setTimeout(() => resolve(messagesUpdate), 500)
            }
        )
    },
    
    postNew(messageText) {
        return new Promise(
            (resolve, _) => {
                const messageFromMockServer = mockCreateNewMessage(messageText);
                console.log(messageFromMockServer);
                setTimeout(() => resolve(messageFromMockServer), 1000);
            }
        );
    }
};

export default messagesApi;