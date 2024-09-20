import React, { useState, useEffect, ChangeEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ConvertIndicator from '../component/convert/ConvertIndicator';
import NovelBox from '../component/convert/novel/NovelBox';
import CharacterBox from '../component/convert/character/CharacterBox';
import ScriptBox from '../component/convert/script/ScriptBox';
import StoryboardBox from '../component/convert/storyboard/StoryboardBox';
import StatisticsBox from '../component/convert/statistics/StatisticsBox';
import bgImgOne from '../assets/background/bg-5.png';
import bgImgTwo from '../assets/background/bg-1.png';
import bgImgThree from '../assets/background/bg-6.png';
import { ReactComponent as SaveFileIcon } from '../assets/icons/save_file_icon.svg';
import { useMoveScroll } from '../hooks/useMoveScroll';
import { AnimationProvider } from '../context/animationContext';
import { useConvertStep } from '../context/convertStepContext';
import ChatbotBox from '../component/convert/chat/ChatbotBox';
import { useConvert } from '../hooks/useConvert';
import {
  useNovelTitleData,
  useNovelData,
  useNovelIdData,
} from '../context/convertDataContext';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../utils/queryKeys';

interface TextProps {
  color: string;
  size: string;
  weight: string;
}

type bgProps = {
  bgImg: string;
  fade: boolean;
};

const ConvertPage = () => {
  const { title, setTitle } = useNovelTitleData();
  const [select, setSelect] = useState(0); // 사용자가 선택한 컴포넌트
  const [scrollTop, setScrollTop] = useState(0); // NovelBox, CharacterBox 동시 스크롤
  const [fadeOut, setFadeOut] = useState(false); // 배경 애니메이션 fade 상태
  const [currentBg, setCurrentBg] = useState(bgImgOne);
  const { step } = useConvertStep();

  const handleScroll = (newScrollTop: number) => {
    setScrollTop(newScrollTop);
  };

  // 인디케이터 이동
  const stepTabs = [
    useMoveScroll('소설'),
    useMoveScroll('대본'),
    useMoveScroll('스토리보드'),
    useMoveScroll('통계'),
  ];

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // background
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step[2]) {
        setFadeOut(true);
        setCurrentBg(bgImgThree);
        setFadeOut(false);
      } else if (step[1]) {
        setFadeOut(true);
        setCurrentBg(bgImgTwo);
        setFadeOut(false);
      } else if (step[0]) {
        setFadeOut(true);
        setCurrentBg(bgImgOne);
        setFadeOut(false);
      }
    }, 1000); // move animation을 고려하여 시간 설정

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <Background fade={fadeOut} bgImg={currentBg}>
      <BackgroundCover>
        <ConvertStepProvider>
        <TopContainer>
          <TitleInputBox>
            <TitleInput
              value={title}
              onChange={handleTextChange}
              placeholder="제목을 입력해주세요.(n0자)"
            />
          </TitleInputBox>
          <IndicatorBox>
            <ConvertIndicator
              select={select}
              setSelect={setSelect}
              stepTabs={stepTabs}
            />
            <div style={{ width: '2rem' }} />
          </IndicatorBox>
        </TopContainer>
        {/* components */}
        <AnimationProvider>
          <ConvertStepWrapper>
            <NovelBox
              ref={stepTabs[0].element}
              data=""
              onScroll={handleScroll}
              scrollTop={scrollTop}
            />
            <CharacterBox
              onScroll={handleScroll}
              scrollTop={scrollTop}
              setSelect={setSelect}
              onMoveScroll={stepTabs[1].onMoveElement}
            />
            <ScriptBox
              ref={stepTabs[1].element}
              setSelect={setSelect}
              onMoveScroll={stepTabs[2].onMoveElement}
            />
            <StoryboardBox
              ref={stepTabs[2].element}
              setSelect={setSelect}
              onMoveScroll={stepTabs[3].onMoveElement}
            />
            <StatisticsBox ref={stepTabs[3].element} data="" />
          </ConvertStepWrapper>
        </AnimationProvider>
        </ConvertStepProvider>
        <ChatbotBox />
      </BackgroundCover>
    </Background>
  );
};

export default ConvertPage;

// keyframes
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// background
const Background = styled.div<bgProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ fade, bgImg }) => css`
    animation: ${fade && fadeIn} 1s forwards;
    background-image: url(${bgImg});
  `}
  transition: 1s ease-in-out;
  background-size: cover;
  ${css`
    height: calc(100vh - 80px);
  `}
`;

const BackgroundCover = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(166, 162, 154, 0.4);
  backdrop-filter: blur(3px);
  padding: 0 13rem;
  ${css`
    height: calc(100vh - 80px);
  `}
  overflow: hidden;

  @media ${({ theme }) => theme.mediaSize.xl} {
    padding: 0 15rem;
  }
`;

// container
const ConvertStepWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 0 10vw;
  padding: 10vh 0; // TopContainer > height와 값 동일, margin을 주기 위해 값 크게해도 됨

  // 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.mediaSize.xl} {
    padding: 15vh 0; // TopContainer > height와 값 동일, margin을 주기 위해 값 크게해도 됨
  }
`;

const TopContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 10vh;
  gap: 0 10vw;

  @media ${({ theme }) => theme.mediaSize.xl} {
    flex-direction: column;
    gap: 1rem 0;
    padding: 1rem 0;
  }
`;

const IndicatorBox = styled.div`
  min-width: 41rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const SaveButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;

const TitleInputBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 41rem;
  height: 3rem;
  padding: 1rem;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.31);
  background-color: rgba(255, 255, 255, 0.46);
  border-width: 2px;
  border-radius: 1rem;
`;

// component
const TitleInput = styled.input`
  height: 1.3rem;
  flex: 1;
  background-color: transparent;
  border-width: 0 0 1px 0;
  border-color: white;
  font-family: BookkMyungjo;
  color: black;
  &::placeholder {
    color: ${({ theme }) => theme.colors.brown};
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 6.5rem;
  height: 3rem;
  font-size: 1.2rem;
  font-family: BookkMyungjo;
  font-weight: bold;
  color: white;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #959b88, #58613e);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
