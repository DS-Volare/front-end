import React, { createContext, useContext, useState } from 'react';
import { Script } from '../types';
import { Storyboard } from '../types/storyboard';

// 타입 정의
type NovelIdContextType = {
  novelId: string;
  setNovelId: React.Dispatch<React.SetStateAction<string>>;
};

type NovelTitleContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

type NovelContextType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

type CharacterContextType = {
  characterList: string[];
  setCharacterList: React.Dispatch<React.SetStateAction<string[]>>;
};

type ScriptIdContextType = {
  scriptId: number;
  setScriptId: React.Dispatch<React.SetStateAction<number>>;
};

type ScriptContextType = {
  script: Script;
  setScript: React.Dispatch<React.SetStateAction<Script>>;
};

type StoryboardContextType = {
  storyboard: Storyboard;
  setStoryboard: React.Dispatch<React.SetStateAction<Storyboard>>;
};

type ChatRoomIdContextType = {
  chatRoomId: string;
  setChatRoomId: React.Dispatch<React.SetStateAction<string>>;
};

type StatisticsContextType = {};

// 전역: 컨택스트 정의
const NovelIdContext = createContext<NovelIdContextType | undefined>({
  novelId: '',
  setNovelId: () => {},
});

const NovelTitleContext = createContext<NovelTitleContextType | undefined>({
  title: '',
  setTitle: () => {},
});

const NovelContext = createContext<NovelContextType | undefined>({
  text: '',
  setText: () => {},
});

const CharacterContext = createContext<CharacterContextType | undefined>({
  characterList: [],
  setCharacterList: () => {},
});

const ScriptIdContext = createContext<ScriptIdContextType | undefined>({
  scriptId: 0,
  setScriptId: () => {},
});

const ScriptContext = createContext<ScriptContextType | undefined>({
  script: {
    scene: [],
  },
  setScript: () => {},
});

const StoryboardContext = createContext<StoryboardContextType | undefined>({
  storyboard: {
    scene: [],
  },
  setStoryboard: () => {},
});

const ChatRoomIdContext = createContext<ChatRoomIdContextType | undefined>({
  chatRoomId: '',
  setChatRoomId: () => {},
});

// 컨택스트를 전역적으로 제공할 수 있는 프로바이더 작성, 컴포넌트 순서 상관X
const ConvertDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState<string>('');
  const [characterList, setCharacterList] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [script, setScript] = useState<Script>({ scene: [] });
  const [novelId, setNovelId] = useState<string>('');
  const [storyboard, setStoryboard] = useState<Storyboard>({ scene: [] });
  const [scriptId, setScriptId] = useState<number>(0);
  const [chatRoomId, setChatRoomId] = useState<string>('');

  return (
    <ChatRoomIdContext.Provider value={{ chatRoomId, setChatRoomId }}>
      <StoryboardContext.Provider value={{ storyboard, setStoryboard }}>
        <NovelTitleContext.Provider value={{ title, setTitle }}>
          <NovelContext.Provider value={{ text, setText }}>
            <CharacterContext.Provider
              value={{ characterList, setCharacterList }}
            >
              <ScriptContext.Provider value={{ script, setScript }}>
                <ScriptIdContext.Provider value={{ scriptId, setScriptId }}>
                  <NovelIdContext.Provider value={{ novelId, setNovelId }}>
                    {children}
                  </NovelIdContext.Provider>
                </ScriptIdContext.Provider>
              </ScriptContext.Provider>
            </CharacterContext.Provider>
          </NovelContext.Provider>
        </NovelTitleContext.Provider>
      </StoryboardContext.Provider>
    </ChatRoomIdContext.Provider>
  );
};

// 컨텍스트 값을 사용하는 커스텀 훅
const useNovelIdData = () => {
  const context = useContext(NovelIdContext);
  if (context === undefined) {
    throw new Error('useNovelIdData must be used within a ConvertDataProvider');
  }
  return context;
};

const useNovelTitleData = () => {
  const context = useContext(NovelTitleContext);
  if (context === undefined) {
    throw new Error(
      'useNovelTitleData must be used within a ConvertDataProvider'
    );
  }
  return context;
};

const useNovelData = () => {
  const context = useContext(NovelContext);
  if (context === undefined) {
    throw new Error('useNovelData must be used within a ConvertDataProvider');
  }
  return context;
};

const useCharaterData = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error(
      'useCharaterData must be used within a ConvertDataProvider'
    );
  }
  return context;
};

const useScriptIdData = () => {
  const context = useContext(ScriptIdContext);
  if (context === undefined) {
    throw new Error(
      'useScriptIdData must be used within a ConvertDataProvider'
    );
  }
  return context;
};

const useScriptData = () => {
  const context = useContext(ScriptContext);
  if (context === undefined) {
    throw new Error('useScriptData must be used within a ConvertDataProvider');
  }
  return context;
};

const useStoryboardData = () => {
  const context = useContext(StoryboardContext);
  if (context === undefined) {
    throw new Error(
      'useStoryboardData must be used within a ConvertDataProvider'
    );
  }
  return context;
};

const useChatRoomIdData = () => {
  const context = useContext(ChatRoomIdContext);
  if (context === undefined) {
    throw new Error('ChatRoomIdData must be used within a ConvertDataProvider');
  }
  return context;
};

export {
  ConvertDataProvider,
  useNovelIdData,
  useNovelTitleData,
  useNovelData,
  useCharaterData,
  useScriptIdData,
  useScriptData,
  useStoryboardData,
  useChatRoomIdData,
};
