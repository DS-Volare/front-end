import React from 'react';
import { MessageListContainer } from '../../../styles/chatbotStyles';
import { Message } from '../../../types';
import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages?: Message[];
  currentTypingId: string | null;
  onEndTyping: (id: string) => void;
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, currentTypingId, onEndTyping }, ref) => (
    <MessageListContainer ref={ref}>
      {messages &&
        messages.map((message, index) => (
          <ChatMessage
            key={index}
            {...message}
            onEndTyping={onEndTyping}
            currentTypingId={currentTypingId}
          />
        ))}
    </MessageListContainer>
  )
);

export default MessageList;
