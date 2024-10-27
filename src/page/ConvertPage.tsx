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
  useScriptData,
  useScriptIdData,
  useStoryboardData,
} from '../context/convertDataContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationKeys, queryKeys } from '../utils/queryKeys';
import { useLocation } from 'react-router-dom';
import PopPageModal from '../component/base/PopPageModal';
import {
  FileButton,
  GlassBox,
  ScrollText,
  TitleText,
} from '../styles/convertBoxStyles';
import { ReactComponent as FileDownloadIcon } from '../assets/icons/file_download_icon.svg';
import { ContentBox } from '../styles/storyboardStyles';
import SceneList from '../component/convert/script/SceneList';
import CutList from '../component/convert/storyboard/CutList';
import StoryboardInfo from '../component/convert/storyboard/StoryboardInfo';
import Mindmap from '../component/convert/statistics/Mindmap';
import RateChart from '../component/convert/statistics/RateChart';
import Spinner from '../component/base/Spinner';
import { spinnerText } from '../utils/spinnerText';

interface TextProps {
  color: string;
  size: string;
  weight: string;
}

type bgProps = {
  $bgImg: string;
  $fade: boolean;
};

const ConvertPage = () => {
  // context data
  const { title, setTitle } = useNovelTitleData();
  const { text, setText } = useNovelData();
  const { script, setScript } = useScriptData();
  const { storyboard, setStoryboard } = useStoryboardData();
  const { scriptId, setScriptId } = useScriptIdData();

  const [select, setSelect] = useState(0); // 사용자가 선택한 컴포넌트
  const [isOpen, setModalIsOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(0); // NovelBox, CharacterBox 동시 스크롤
  const [fadeOut, setFadeOut] = useState(false); // 배경 애니메이션 fade 상태
  const [currentBg, setCurrentBg] = useState(bgImgOne);
  const [isDetail, setIsDetail] = useState(false);

  const { step, setStep } = useConvertStep();
  const { convertDetail, apperanceRate, convertStatistics } = useConvert();

  const location = useLocation();

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

  // convert detail query
  const convertDetailQuery = useQuery({
    queryKey: queryKeys.detail,
    queryFn: () => convertDetail(location.state.novelId),
    enabled: isDetail, // isDetail이 true가 되었을 때 쿼리 실행
  });

  const appearanceQuery = useQuery({
    queryKey: queryKeys.appearance,
    queryFn: () => apperanceRate(scriptId),
    enabled: isDetail,
  });

  const statisticsQuery = useQuery({
    queryKey: queryKeys.statistics,
    queryFn: () => convertStatistics(scriptId),
    enabled: isDetail,
  });

  // 변환페이지 이동했을시 data, step 초기화
  useEffect(() => {
    if (isDetail && !convertDetailQuery.isFetching) {
      const { novel, script, storyBoard } = convertDetailQuery.data.result;

      // 1. step 초기화
      let tempConvertStep = [true]; // 소설은 항상 있으므로 true를 넣어줌

      // script, storybaord, statistics의 step 값 초기화
      tempConvertStep.push(script.isExist ? true : false);
      tempConvertStep = tempConvertStep.concat(
        storyBoard.isExist ? [true, true] : [false, false]
      );
      setStep(tempConvertStep);

      // 2. data 초기화
      setTitle(novel.title); // 소설 제목
      setText(novel.storyText); // 소설 내용

      if (script.isExist) setScript({ scene: script.data.script }); // 대본
      if (storyBoard.isExist) setStoryboard(storyBoard.data); // 스토리보드
      // 통계 정보에 대한 set 필요
      setScriptId(script.data.scriptId);
    }
  }, [convertDetailQuery.isFetching]);

  // 뒤로가기, 새로고침 이벤트, 상세페이지 여부 처리
  useEffect(() => {
    const preventGoBack = (event: Event) => {
      event.preventDefault();
      setModalIsOpen(true);
    };

    // mypage -> convert page
    if (location.state) {
      setIsDetail(true); // 상세페이지 모드
    }

    // 뒤로가기, 새로고침 이벤트 추가
    const preventLoad = (event: Event) => {
      event.preventDefault();
    };
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('popstate', preventGoBack); // 뒤로가기 event
    window.addEventListener('beforeunload', preventLoad); // 새로고침 event

    return () => {
      window.removeEventListener('popstate', preventGoBack);
      window.removeEventListener('beforeunload', preventLoad);
    };
  }, []);

  // 상세 페이지일시 쿼리 재요청
  useEffect(() => {
    if (isDetail) {
      convertDetailQuery.refetch();
    }
  }, [isDetail]);

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
    <Background $fade={fadeOut} $bgImg={currentBg}>
      <BackgroundCover>
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
          </IndicatorBox>
        </TopContainer>
        {/* components */}
        <AnimationProvider>
          <ConvertStepWrapper>
            {/* 소설 박스 */}
            <NovelBox
              ref={stepTabs[0].element}
              data=""
              onScroll={handleScroll}
              scrollTop={scrollTop}
            />
            {/* 마이페이지 -> 변환 페이지로 이동했을 때 보여주지 않음 */}
            {!isDetail && (
              <CharacterBox
                onScroll={handleScroll}
                scrollTop={scrollTop}
                setSelect={setSelect}
                onMoveScroll={stepTabs[1].onMoveElement}
              />
            )}
            {/* 대본 변환 박스 */}
            {!isDetail && (
              <ScriptBox
                ref={stepTabs[1].element}
                setSelect={setSelect}
                onMoveScroll={stepTabs[2].onMoveElement}
              />
            )}
            {isDetail &&
              !convertDetailQuery.isFetching &&
              convertDetailQuery.data.result.script.isExist && (
                <div ref={stepTabs[1].element}>
                  <GlassBox $hasData={true}>
                    <TitleText>대본화</TitleText>
                    <FileButton>
                      <FileDownloadIcon width="2rem" height="2rem" />
                      &nbsp;다운로드
                    </FileButton>
                    <ContentBox>
                      <ScrollText>
                        <SceneList />
                      </ScrollText>
                    </ContentBox>
                  </GlassBox>
                </div>
              )}
            {/* 스토리보드 박스 */}
            {!isDetail && (
              <StoryboardBox
                ref={stepTabs[2].element}
                setSelect={setSelect}
                onMoveScroll={stepTabs[3].onMoveElement}
              />
            )}
            {isDetail &&
              !convertDetailQuery.isFetching &&
              convertDetailQuery.data.result.storyBoard.isExist && (
                <div ref={stepTabs[2].element}>
                  <GlassBox $hasData={true}>
                    <TitleText>스토리보드</TitleText>
                    <FileButton>
                      <FileDownloadIcon width="2rem" height="2rem" />
                      &nbsp;다운로드
                    </FileButton>
                    <ContentBox>
                      <ScrollText>
                        {storyboard.scene.map((s, index) => (
                          <React.Fragment key={index}>
                            <StoryboardInfo
                              data={{
                                scene_num: s.scene_num,
                                summary: s.summary,
                                location: s.location,
                                cutCount: s.content!.length,
                              }}
                            />
                            <CutList cuts={s.content!} />
                          </React.Fragment>
                        ))}
                      </ScrollText>
                    </ContentBox>
                  </GlassBox>
                </div>
              )}
            {/* 통계 박스 */}
            {!isDetail && <StatisticsBox ref={stepTabs[3].element} data="" />}
            {isDetail && (
              <div ref={stepTabs[3].element}>
                <GlassBox $hasData={true}>
                  <TitleText>통계</TitleText>
                  <ContentBox style={{ overflowY: 'scroll' }}>
                    {!appearanceQuery.isFetching &&
                    !statisticsQuery.isFetching &&
                    appearanceQuery.data &&
                    statisticsQuery.data ? (
                      <>
                        <Mindmap result={statisticsQuery.data.result} />
                        <RateChart result={appearanceQuery.data.result} />
                      </>
                    ) : (
                      <Spinner text={spinnerText.statistics} />
                    )}
                  </ContentBox>
                </GlassBox>
              </div>
            )}
          </ConvertStepWrapper>
        </AnimationProvider>
        <ChatbotBox />
        {/* pop page modal */}
        <PopPageModal isOpen={isOpen} setModalIsOpen={setModalIsOpen} />
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
  ${({ $fade, $bgImg }) => css`
    animation: ${$fade && fadeIn} 1s forwards;
    background-image: url(${$bgImg});
  `}
  transition: 1s ease-in-out;
  background-size: cover;
  ${css`
    height: calc(100vh - 80px);
  `}
`;

const BackgroundCover = styled.div`
  display: flex;
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
