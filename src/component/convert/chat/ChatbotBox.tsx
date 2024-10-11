import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ChatbotButton,
  ChatBox,
  ChatContainer,
  Title,
} from '../../../styles/chatbotStyles';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { Message } from '../../../types';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { useConvert } from '../../../hooks/useConvert';
import { useScriptIdData } from '../../../context/convertDataContext';
import { Toast } from '../../../styles/ToastStyle';
import { toastText } from '../../../utils/toastText';

const ChatbotBox = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // drawer
  const [messages, setMessages] = useState<Message[]>([]); // 모든 채팅 메시지
  const [currentTypingId, setCurrentTypingId] = useState<string | null>(null); // 타이핑 애니메이션을 재생할 채팅 메시지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션이 동작 중이면 true
  const messageListRef = useRef<HTMLDivElement>(null); // 메시지 리스트 영역. 스크롤 조작을 위함
  const client = useRef<CompatClient>(); // 채팅 Stomp 클라이언트
  const { startNewChat, getChatList } = useConvert();

  const { scriptId } = useScriptIdData();
  const [chatRoomId, setChatRoomId] = useState<string>('none');

  const startChatHandler = async () => {
    console.log(scriptId);
    const result = await startNewChat(scriptId);
    setChatRoomId(result.chatRoomId);
  };

  // (stomp) connect & subscribe
  const connectHandler = async (chatRoomId: string) => {
    const result = await getChatList(chatRoomId);
    setMessages(result.allMessages);

    client.current = Stomp.over(() => {
      const sock = new WebSocket(`ws://localhost:8080/websocket`);
      return sock;
    });
    client.current!.debug = function (str) {}; // console.log off

    client.current.connect(
      {
        // request header
      },
      () => {
        // connectCallback 함수 설정
        client.current!.subscribe(
          `/sub/chats/${chatRoomId}`,
          (msg: IMessage) => {
            let newMessage: Message = JSON.parse(msg.body); // 메시지 내용 꺼내기
            newMessage = { ...newMessage, isTyping: true };
            setMessages((prevState) => [...prevState, newMessage]);
          },
          {
            // request header
          }
        );
      },
      () => {
        // 에러 핸들링 콜백... 채팅 종료
        client.current!.disconnect(() => {
          // window.location.reload();
        });
      }
    );
    return client;
  };

  // (stomp) disconnect
  const disconnectHandler = () => {
    if (client.current) {
      client.current.disconnect(() => {
        // window.location.reload();
      });
    }
  };

  // (stomp) send(=publish)
  const sendHandler = (message: string) => {
    client.current!.send(
      `/pub/chats/${chatRoomId}`,
      {
        // request header
      },
      JSON.stringify({
        message: message.trim(),
        messageType: 'QUESTION',
      })
    );
  };

  // 타이핑이 끝났을 때(Typing 컴포넌트의 onFinishedTyping 리스너) 호출되는 함수
  const handleEndTyping = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.messageId === id ? { ...msg, isTyping: false } : msg
      )
    );
    setCurrentTypingId(null);
  };

  // 현재 타이핑 중인 메시지 설정
  useEffect(() => {
    if (currentTypingId === null) {
      const nextTypingMessage = messages.find(
        (msg) => msg.messageType === 'GPT' && msg.isTyping
      );
      if (nextTypingMessage && nextTypingMessage.messageId) {
        setCurrentTypingId(nextTypingMessage.messageId);
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
    open: { opacity: 1, x: -250, zIndex: 1 },
    closed: { opacity: 1, x: 0, zIndex: 1 },
  };

  // floating button
  useEffect(() => {
    if (scriptId !== 0) {
      Toast.success(toastText.chatbotEnable);
      startChatHandler();
    }
  }, [scriptId]);

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
              <MessageForm onSendMessage={sendHandler} isTyping={isTyping} />
            </ChatBox>
          </ChatContainer>
        )}
      </AnimatePresence>

      {scriptId !== 0 && (
        <ChatbotButton
          animate={isDrawerOpen ? 'open' : 'closed'}
          variants={buttonVariants}
          transition={{ type: 'tween' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
            if (isDrawerOpen) {
              disconnectHandler();
            } else {
              connectHandler(chatRoomId);
            }
          }}
        />
      )}
    </>
  );
};

export default ChatbotBox;
