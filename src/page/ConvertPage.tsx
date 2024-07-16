import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConvertIndicator from '../component/ConvertIndicator';
import NovelBox from '../component/NovelBox';
import CharacterBox from '../component/CharacterBox';
import ScriptBox from '../component/ScriptBox';
import StoryboardBox from '../component/StoryboardBox';
import StatisticsBox from '../component/StatisticsBox';
import bgImg from '../assets/background/bg-5.png';
import { ReactComponent as SaveFileIcon } from '../assets/icons/save_file_icon.svg';

interface TextProps {
  color: string;
  size: string;
  weight: string;
}
const ConvertPage = () => {
  const [step, setStep] = useState([false, false, false, false]); // 진행도
  const [select, setSelect] = useState(0); // 사용자가 선택한 컴포넌트
  const [scrollTop, setScrollTop] = useState(0); // NevelBox, CharacterBox 동시 스크롤

  const handleScroll = (newScrollTop: number) => {
    setScrollTop(newScrollTop);
  };

  return (
    <Background>
      <BackgroundCover>
        <TopContainer>
          <TitleInputBox>
            <TitleInput placeholder="제목을 입력해주세요.(n0자)" />
          </TitleInputBox>
          <IndicatorBox>
            <ConvertIndicator step={step} select={select} setSelect={setSelect} />
            <div style={{ width: '2rem' }} />
            <SaveButtonBox>
              <SaveButton>
                <SaveFileIcon width={25} />
                저장
              </SaveButton>
            </SaveButtonBox>
          </IndicatorBox>
        </TopContainer>
        <ConvertStepWrapper>
          <NovelBox data="novel" onScroll={handleScroll} scrollTop={scrollTop} />
          <CharacterBox data="character" onScroll={handleScroll} scrollTop={scrollTop} />
          <ScriptBox data="script" />
          <StoryboardBox data="story" />
          <StatisticsBox data="" />
        </ConvertStepWrapper>
      </BackgroundCover>
    </Background>
  );
};

export default ConvertPage;

// background
const Background = styled.div`
  background-image: url(${bgImg});
  background-size: cover;
  height: calc(100vh - 80px);
`;

const BackgroundCover = styled.p`
  height: 100%;
  background-color: rgba(166, 162, 154, 0.4);
  backdrop-filter: blur(3px);
`;

// container
const ConvertStepWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 0 10vw;
  height: 80vh;
`;

const TopContainer = styled.div`
  height: calc(20vh - 80px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-width: 41rem;
  gap: 0 10vw;
`;

const IndicatorBox = styled.div`
  display: flex;
  width: 41rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const SaveButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;

const TitleInputBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 41rem;
  max-width: 650px;
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
