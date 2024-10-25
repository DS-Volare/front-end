import { Message } from '../../../types';
import { TypeAnimation } from 'react-type-animation';
import {
  ChatbotMessage,
  ChatbotMessageDateTime,
  MessageContainer,
  UserMessage,
  UserMessageDateTime,
} from '../../../styles/chatbotStyles';
import { ReactComponent as ChatbotIcon } from '../../../assets/icons/pencil_icon.svg';

interface ChatMessageProps extends Message {
  onEndTyping: (id: string) => void;
  currentTypingId: string | null;
}

const ChatMessage = ({
  message,
  messageType,
  messageId,
  createdAt,
  isTyping,
  onEndTyping,
  currentTypingId,
}: ChatMessageProps) => {
  return (
    <>
      {messageType === 'QUESTION' ? (
        <MessageContainer>
          <UserMessage>
            <p>{message}</p>
          </UserMessage>
          <UserMessageDateTime>{createdAt}</UserMessageDateTime>
        </MessageContainer>
      ) : (
        <MessageContainer>
          <ChatbotIcon width="2rem" height="2rem" />
          <ChatbotMessage>
            {isTyping && messageId && currentTypingId === messageId ? (
              <TypeAnimation
                sequence={[
                  message,
                  () => {
                    messageId && onEndTyping(messageId);
                  },
                ]}
                wrapper="span"
                speed={50}
                repeat={1}
                cursor={false}
              />
            ) : (
              <p>{message}</p>
            )}
          </ChatbotMessage>
          <ChatbotMessageDateTime>{createdAt}</ChatbotMessageDateTime>
        </MessageContainer>
      )}
    </>
  );
};

export default ChatMessage;
