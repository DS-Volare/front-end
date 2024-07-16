import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FileDownloadIcon } from '../assets/icons/file_download_icon.svg';
import {
  TitleText,
  ContentBox,
  TutorialBox,
  TutorialTitle,
  TutorialText,
  HighlightedText,
  ConvertButton,
  FileButton,
  ScrollText,
  GlassBox,
} from '../styles/convertBoxStyles';
import StoryboardInfo from './StoryboardInfo';
import CutList from './CutList';

type props = {
  data: string; // 추후 스토리보드 객체로 교체
};

const StoryboardBox = ({ data }: props) => {
  // dummy data (스토리보드 객체)
  const cuts = [
    { cutNum: 1, angleCam: 'wide shot', cutText: '모니터 화면에 붉은 여우 한 마리가 이리저리 움직이고 있다.', cutImage: 'link' },
    {
      cutNum: 2,
      angleCam: 'bust shot',
      cutText: '화면이 움직이자 여우 사육사가 나타난다. 여우사육사: 제가 보기엔 괜찮은데, 어떠세요?',
      cutImage: 'link',
    },
    { cutNum: 3, angleCam: 'close up', cutText: '소원: 그러네요. 근데, 여기선 뒷발이 좀 부자연스러웠거든요.', cutImage: 'link' },
  ];
  const storyboardInfo = {
    sceneNum: 1,
    locate: '청주 동물원 - 소원의 집',
    time: '해가 지기 직전',
    summary: '다른 동물원에 보낸 동물들을 걱정하는 소원.',
    cutCount: cuts.length,
  };

  return (
    <>
      {data ? (
        <GlassBox hasData={true}>
          <TitleText>스토리보드</TitleText>
          <FileButton>
            <FileDownloadIcon width="2rem" height="2rem" />
            &nbsp;다운로드
          </FileButton>
          <ContentBox>
            <ScrollText>
              <StoryboardInfo data={storyboardInfo} />
              <CutList cuts={cuts} />
            </ScrollText>
          </ContentBox>
        </GlassBox>
      ) : (
        <GlassBox hasData={false}>
          <TutorialBox>
            <TutorialTitle>#3 스토리보드 생성과 챗봇 기능</TutorialTitle>
            <TutorialText>
              1. 대본에 기반한 <HighlightedText>스토리보드</HighlightedText>가 생성됩니다.
              <br />
              2. 수정과 각색에 도움을 주는 <HighlightedText>챗봇</HighlightedText>을 사용할 수 있습니다.
            </TutorialText>
          </TutorialBox>
          <ConvertButton>스토리보드 변환</ConvertButton>
        </GlassBox>
      )}
    </>
  );
};

export default StoryboardBox;
