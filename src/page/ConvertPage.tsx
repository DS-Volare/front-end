import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ConvertIndicator from '../component/ConvertIndicator';
import NovelBox from '../component/NovelBox';
import CharacterBox from '../component/CharacterBox';
import ScriptBox from '../component/ScriptBox';
import StoryboardBox from '../component/StoryboardBox';
import StatisticsBox from '../component/StatisticsBox';
import bgImg from '../assets/background/bg-5.png';
import { ReactComponent as SaveFileIcon } from '../assets/icons/save_file_icon.svg';
import { useMoveScroll } from '../hooks/useMoveScroll';
import { AnimationProvider } from '../context/animationContext';
import { ConvertStepProvider } from '../context/convertStepContext';

interface TextProps {
  color: string;
  size: string;
  weight: string;
}
const ConvertPage = () => {
  const [step, setStep] = useState([false, false, false, false]); // 진행도
  const [select, setSelect] = useState(0); // 사용자가 선택한 컴포넌트
  const [scrollTop, setScrollTop] = useState(0); // NevelBox, CharacterBox 동시 스크롤

  // 화면 애니메이션을 위한 임시 상태 관리, 추후에 api 호출로 수정
  // 상호참조, 대본, 스토리보드(버튼 클릭 전/후)
  const [temp, setTemp] = useState(['', '', '']);

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

  return (
    <Background>
      <BackgroundCover>
        <ConvertStepProvider>
          <TopContainer>
            <TitleInputBox>
              <TitleInput placeholder="제목을 입력해주세요.(n0자)" />
            </TitleInputBox>
            <IndicatorBox>
              <ConvertIndicator
                step={step}
                select={select}
                setSelect={setSelect}
                stepTabs={stepTabs}
              />
              <div style={{ width: '2rem' }} />
              <SaveButtonBox>
                <SaveButton>
                  <SaveFileIcon width={25} />
                  저장
                </SaveButton>
              </SaveButtonBox>
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
                data={temp[0]}
                onScroll={handleScroll}
                scrollTop={scrollTop}
                temp={temp}
                setTemp={setTemp}
                onMoveScroll={stepTabs[1].onMoveElement}
              />
              <ScriptBox
                ref={stepTabs[1].element}
                data={temp[1]}
                temp={temp}
                setTemp={setTemp}
                onMoveScroll={stepTabs[2].onMoveElement}
              />
              <StoryboardBox
                ref={stepTabs[2].element}
                data={temp[2]}
                temp={temp}
                setTemp={setTemp}
                onMoveScroll={stepTabs[3].onMoveElement}
              />
              <StatisticsBox ref={stepTabs[3].element} data="" />
            </ConvertStepWrapper>
          </AnimationProvider>
        </ConvertStepProvider>
      </BackgroundCover>
    </Background>
  );
};

// background
const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${bgImg});
  background-size: cover;
  ${css`
    height: calc(100vh - 80px);
  `}
`;

const BackgroundCover = styled.p`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(166, 162, 154, 0.4);
  backdrop-filter: blur(3px);
  padding: 0 5vw;
  ${css`
    height: calc(100vh - 80px);
  `}
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

export default ConvertPage;
