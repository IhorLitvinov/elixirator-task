import Chat from './Chat';

describe('testing getLastMessageId', () => {
  test('getLastMessageId ordered messages', () => {
    const messages = {
      1: { messageId: 1 },
      2: { messageId: 2 },
      3: { messageId: 3 },
      4: { messageId: 4 },
    }

    expect(Chat.getLastMessageId(messages)).toBe(4);
  });

  test('getLastMessageId no messages', () => {
    const messages = {}
    expect(Chat.getLastMessageId(messages)).toBe(-1);
  });


  test('getLastMessageId single message', () => {
    const messages = {
      3: { messageId: 3 },
    }
    expect(Chat.getLastMessageId(messages)).toBe(3);
  });

  test('getLastMessageId wrong order', () => {
    const messages = {
      2: { messageId: 2 },
      1: { messageId: 1 },
      14: { messageId: 14 },
      3: { messageId: 3 },
    }
    expect(Chat.getLastMessageId(messages)).toBe(14);
  });
});
