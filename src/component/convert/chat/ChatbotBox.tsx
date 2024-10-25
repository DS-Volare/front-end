import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { queryKeys } from '../../../utils/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from '../../base/Spinner';
import { ReactComponent as ChatbotIcon } from '../../../assets/icons/pencil_center.svg';
import { ReactComponent as GoBackIcon } from '../../../assets/icons/go-back.svg';

const ChatbotBox = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // drawer
  const [messages, setMessages] = useState<Message[]>([]); // 모든 채팅 메시지
  const [currentTypingId, setCurrentTypingId] = useState<string | null>(null); // 타이핑 애니메이션을 재생할 채팅 메시지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 애니메이션이 동작 중이면 true
  const messageListRef = useRef<HTMLDivElement>(null); // 메시지 리스트 영역. 스크롤 조작을 위함
  const client = useRef<CompatClient>(); // 채팅 Stomp 클라이언트
  const { startNewChat, getChatList } = useConvert();

  const { scriptId, setScriptId } = useScriptIdData();
  setScriptId(14); // ★★★ 테스트용. 추후 삭제
  const [chatRoomId, setChatRoomId] = useState<string>('');

  // 채팅 목록 무한스크롤: 커서 기반 페이징
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.chatlist, chatRoomId],
      queryFn: getChatList,
      getNextPageParam: (lastPage) => {
        if (lastPage?.result?.hasNext) {
          const lastMessage = lastPage.result.allMessages[0];
          return lastMessage.messageId;
        }
        return null;
      },
      initialPageParam: '', // 최초 요청 시 pageParam을 빈 문자열로 설정 (최신 메시지 요청 시)
      enabled: !!chatRoomId, // chatRoomId가 있을 때만 쿼리 실행
    });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const startChatHandler = async () => {
    // ★★★ 테스트용. 주석 해제할 것
    // const result = await startNewChat(scriptId);
    // setChatRoomId(result.chatRoomId);
    setChatRoomId('1ed12435-a04b-4fc6-b339-e670a75e4a8b');
  };

  // (stomp) connect & subscribe
  const connectHandler = useCallback(async (chatRoomId: string) => {
    client.current = Stomp.over(() => {
      const sock = new WebSocket(`ws://localhost:8080/websocket`);
      return sock;
    });
    client.current!.debug = function (str) {}; // (Stomp CompatClient) console.log off

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
  }, []);

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

  // 스크롤을 최하단으로 설정
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  // 새 메시지 전송 시 스크롤을 최하단으로 설정
  useEffect(() => {
    scrollToBottom();
  }, [isTyping]); // 의존성 변경 요망

  // 챗봇이 타이핑 시작 시 isTyping을 true로 설정
  useEffect(() => {
    setIsTyping(currentTypingId !== null);
  }, [currentTypingId]);

  // 챗봇 drawer toggle button 애니메이션
  const buttonVariants = {
    open: { opacity: 1, x: -250, zIndex: 1 },
    closed: { opacity: 1, x: 0, zIndex: 1 },
  };

  // floating button 활성화
  useEffect(() => {
    if (scriptId !== 0) {
      Toast.success(toastText.chatbotEnable);
      startChatHandler();
    }
  }, [scriptId]);

  // 스크롤 이벤트
  const handleScroll = () => {
    const container = messageListRef.current;
    if (container) {
      const scrollY = container.scrollTop;
      if (container.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
        // 스크롤이 맨 위에 닿았고 다음 페이지가 있다면 handleLoadMore 호출
        handleLoadMore();
      }
    }
  };

  const prevFetching = useRef(isFetchingNextPage); // 이전 상태 저장

  // 메시지 목록 업데이트
  // infiniteQuery에서 hasNext, hasPrevious 모두를 사용하지 않고 hasNext만 사용하기로 해서 이렇게 업데이트해야 함(잘못된 선택일까...)
  useEffect(() => {
    console.log(data);
    if (data?.pages?.length && data.pages[0] !== undefined) {
      console.log(data.pages.length);

      const messages: Message[] = data.pages
        .slice() // 원본 배열을 수정하지 않기 위해 복사
        .reverse() // 페이지 순서를 반대로 (오래된 페이지가 앞쪽으로)
        .flatMap((page: any) => {
          return page.result.allMessages as Message[];
        });

      setMessages(messages);
    }

    const container = messageListRef.current;

    if (!container) return;

    // 데이터 로드 완료 시점 (isFetchingNextPage가 true -> false로 바뀔 때)
    if (prevFetching.current && !isFetchingNextPage) {
      // 스크롤 높이 차이 계산
      const previousScrollHeight = container.scrollHeight;

      // 데이터가 로드된 후에 스크롤 위치 보정
      setTimeout(() => {
        const newScrollHeight = container.scrollHeight;
        const heightDifference = newScrollHeight - previousScrollHeight;
        container.scrollTop += heightDifference;
      }, 0); // 데이터가 렌더링된 후 보정
    }
    // 이전 상태 업데이트
    prevFetching.current = isFetchingNextPage;
  }, [isFetchingNextPage, data]); // isFetchingNextPage가 true->false일 때만 동작해도 됨

  useEffect(() => {
    const container = messageListRef.current;
    if (container) {
      // 스크롤 이벤트 리스너 추가
      container.addEventListener('scroll', handleScroll);
      return () => {
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isDrawerOpen, isFetchingNextPage]);

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
              {isFetchingNextPage && <Spinner text="" />}
              {data && (
                <MessageList
                  messages={messages}
                  currentTypingId={currentTypingId}
                  onEndTyping={handleEndTyping}
                  ref={messageListRef}
                />
              )}
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
        >
          {isDrawerOpen ? (
            <GoBackIcon height="1.5rem" />
          ) : (
            <ChatbotIcon width="4rem" height="4rem" />
          )}
        </ChatbotButton>
      )}
    </>
  );
};

export default ChatbotBox;
