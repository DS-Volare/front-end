import { useRef, useState } from 'react';
import {
  MessageFormContainer,
  ChatInputArea,
  SubmitButton,
} from '../../../styles/chatbotStyles';
import { ReactComponent as SendIcon } from '../../../assets/icons/send.svg';

interface MessageFormProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const MessageForm = ({ onSendMessage, isTyping }: MessageFormProps) => {
  const [message, setMessage] = useState('');
  const chatInputRef = useRef<HTMLTextAreaElement | null>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const maxTextareaHeight = 300;
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      maxTextareaHeight
    )}px`;
  };

  return (
    <MessageFormContainer onSubmit={handleSubmit}>
      <ChatInputArea value={message} onChange={handleTextAreaChange} />
      <SubmitButton type="submit" disabled={!message.trim() || isTyping}>
        <SendIcon width="1.5rem" height="1.5rem" />
      </SubmitButton>
    </MessageFormContainer>
  );
};

export default MessageForm;
