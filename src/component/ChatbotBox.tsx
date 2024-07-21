import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ChatbotButton,
  ChatBox,
  ChatContainer,
  Title,
} from '../styles/chatbotStyles';
import ChatMessageForm from './ChatForm';
import MessageList from './MessageList';
import { Message } from '../types';

type Props = {
  chatId?: string; // 추후 변경
};

const ChatbotBox = ({ chatId }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // drawer
  const [messages, setMessages] = useState<Message[]>([]); // 모든 채팅 메시지
  const [currentTypingId, setCurrentTypingId] = useState<number | null>(null); // 타이핑 애니메이션이 재생 중인 채팅 메시지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션이 동작 중이면 true
  const messageListRef = useRef<HTMLDivElement>(null); // 메시지 리스트 영역. 스크롤 조작을 위함

  // 메시지 전송 함수
  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
      {
        text: `${message}`,
        isUser: false,
        isTyping: true,
        id: Date.now(),
      },
    ]);
  };

  // 타이핑이 끝났을 때(라이브러리 컴포넌트에서 판정함) 호출되는 함수
  const handleEndTyping = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );
    setCurrentTypingId(null);
  };

  // 현재 타이핑 중인 메시지 설정
  useEffect(() => {
    if (currentTypingId === null) {
      const nextTypingMessage = messages.find(
        (msg) => !msg.isUser && msg.isTyping
      );
      if (nextTypingMessage && nextTypingMessage.id) {
        setCurrentTypingId(nextTypingMessage.id);
      }
    }
  }, [messages, currentTypingId]);

  // 새 메시지 전송 시 스크롤을 최하단으로 설정
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // 챗봇이 타이핑 시작 시 isTyping을 true로 설정
  useEffect(() => {
    setIsTyping(currentTypingId !== null);
  }, [currentTypingId]);

  // 챗봇 drawer toggle button 애니메이션
  const buttonVariants = {
    init: {
      x: 0,
    },
    end: (isDrawerOpen: boolean) => ({
      x: isDrawerOpen ? -250 : 0,
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isDrawerOpen && (
          <ChatContainer
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: 'tween' }}
          >
            <ChatBox>
              <Title>Chat</Title>
              <MessageList
                messages={messages}
                currentTypingId={currentTypingId}
                onEndTyping={handleEndTyping}
                ref={messageListRef}
              />
              <ChatMessageForm
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
              />
            </ChatBox>
          </ChatContainer>
        )}
      </AnimatePresence>

      <ChatbotButton
        initial="init"
        animate="end"
        variants={buttonVariants}
        custom={isDrawerOpen}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsDrawerOpen(!isDrawerOpen);
        }}
        transition={{ type: 'tween' }}
      />
    </>
  );
};

export default ChatbotBox;
