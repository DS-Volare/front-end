import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FileDownloadIcon } from '../assets/icons/file_download_icon.svg';
import {
  TitleText,
  ContentBox,
  ScrollTextArea,
  TutorialBox,
  TutorialTitle,
  TutorialText,
  HighlightedText,
  ConvertButton,
  FileButton,
  GlassBox,
} from '../styles/convertBoxStyles';

type props = {
  data: string;
};

const ScriptBox = ({ data }: props) => {
  return (
    <>
      {data ? (
        <GlassBox hasData={true}>
          <TitleText>대본화</TitleText>
          <FileButton>
            <FileDownloadIcon width="2rem" height="2rem" />
            &nbsp;다운로드
          </FileButton>
          <ContentBox>
            <ScrollTextArea placeholder="텍스트" />
          </ContentBox>
        </GlassBox>
      ) : (
        <GlassBox hasData={false}>
          <TutorialBox>
            <TutorialTitle>#2 소설을 대본으로 변환하기</TutorialTitle>
            <TutorialText>
              입력한 정보를 토대로
              <br />
              각 등장인물의 대사와 행위를 구분해
              <br />
              <HighlightedText>대본 형식으로 변환</HighlightedText>합니다.
            </TutorialText>
          </TutorialBox>
          <ConvertButton>대본 변환</ConvertButton>
        </GlassBox>
      )}
    </>
  );
};

export default ScriptBox;
