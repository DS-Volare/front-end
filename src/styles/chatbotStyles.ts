import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components
export const ChatbotButton = styled(motion.button)`
  position: absolute;
  right: 5rem;
  bottom: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.darkBrown};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ChatContainer = styled(motion.div)`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 20rem;
  height: 100%;
  display: flex;
  background: rgba(149, 155, 136, 0.6);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

export const ChatBox = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  padding: 20px;
  margin: 0;
  color: white;
  height: 4rem;
`;

export const MessageListContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  flex-grow: 1;
  overflow-y: auto;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const BaseMessage = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const UserMessage = styled(BaseMessage)`
  align-self: flex-end;
  background: ${({ theme }) => theme.colors.darkBrown};
  color: #fff;
  border-radius: 16px 16px 0 16px;
  margin-left: auto;
`;

export const UserMessageDateTime = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: white;
  margin-left: auto;
`;

export const ChatbotMessage = styled(BaseMessage)`
  align-self: flex-start;
  background: #f0f0f0;
  color: #333;
  border-radius: 16px 16px 16px 0;
`;

export const ChatbotMessageDateTime = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: white;
`;

export const ChatbotIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

export const MessageFormContainer = styled.form`
  border-top: 1px solid #f0f0f0;
  padding: 20px;
  bottom: 0;
  display: flex;
  align-items: center;
`;

export const ChatInputArea = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid #ccc;
  margin-right: 10px;

  resize: none;
  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 16px;
  border: none;
  background-color: ${({ theme }) => theme.colors.orange};
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
