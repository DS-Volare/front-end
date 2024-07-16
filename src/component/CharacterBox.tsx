import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CharacterChipList from './CharacterChipList';
import {
  TitleText,
  ContentBox,
  ScrollText,
  TutorialBox,
  TutorialTitle,
  TutorialText,
  HighlightedText,
  ConvertButton,
  GlassBox,
} from '../styles/convertBoxStyles';

// dummy data (입력 데이터 예시)
const inputSentences = [
  ['왕자는', '너무도', '친숙한', '라푼젤의', '목소리가', '들리자', '앞으로', '나아갔어요.'],
  ['왕자는', '다가오자마자', '라푼젤은', '왕자를', '알아보고', '목을', '감싸며', '안겨서', '울었어요.'],
  ['그때', '라푼젤의', '눈물', '두', '방울이', '그의', '눈들을', '적셨어요.'],
  ['그러자', '왕자의', '시력이', '점점', '밝아지며', '급기야', '예전처럼', '라푼젤을', '볼', '수', '있게', '되었어요.'],
  ['왕자는', '라푼젤을', '데리고', '자신의', '왕국으로', '돌아갔어요.'],
  ['왕국에서도', '왕자의', '일행을', '대환영해주었어요.'],
  ['이후', '그들은', '행복해하고', '만족해하며', '오래토록', '잘', '살았답니다.'],
];
// dummy data (하이라이트할 결과 데이터 예시)
const resultData1 = [
  { text: '왕자는', sent_id: 0, start_eid: 0, end_eid: 0 },
  { text: '그를', sent_id: 1, start_eid: 3, end_eid: 3 },
];
const resultData = [
  [
    { text: '왕자는', sent_id: 0, start_eid: 0, end_eid: 0 },
    { text: '그를', sent_id: 1, start_eid: 3, end_eid: 3 },
  ],
  [
    { text: '라푼젤의', sent_id: 0, start_eid: 3, end_eid: 3 },
    { text: '라푼젤을', sent_id: 4, start_eid: 1, end_eid: 1 },
  ],
];

interface Props {
  data: string;
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
}

const CharacterBox = ({ data, onScroll, scrollTop }: Props) => {
  const [characterList, setCharacterList] = useState(['왕자', '라푼젤']);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 각 어절을 div로 렌더링
  const renderWords = () => {
    return inputSentences.map((sentence, sentIndex) =>
      sentence.map((word, eid) => {
        const highlightInfo = resultData.find((dataGroup) =>
          dataGroup.some((data) => data.sent_id === sentIndex && data.start_eid <= eid && data.end_eid >= eid)
        );

        if (!highlightInfo) {
          return (
            <HighlightedWord key={`${sentIndex}-${eid}`} highlightColor="transparent">
              {word}&nbsp;
            </HighlightedWord>
          );
        }

        // highlightInfo가 포함된 groupIndex 찾기
        const groupIndex = resultData.findIndex((dataGroup) =>
          dataGroup.some((data) => data.sent_id === sentIndex && data.start_eid <= eid && data.end_eid >= eid)
        );

        // groupIndex에 따라 색상 설정
        const highlightColor = getHighlightColor(groupIndex);

        return (
          <>
            <HighlightedWord key={`${sentIndex}-${eid}`} highlightColor={highlightColor}>
              {word}
            </HighlightedWord>
            &nbsp;
          </>
        );
      })
    );
  };

  // groupIndex에 따라 색상 반환 함수
  const getHighlightColor = (groupIndex: number): string => {
    const colors = ['yellow', 'orange', 'lightgreen', 'lightblue']; // 원하는 색상 추가 가능

    // groupIndex가 colors 배열의 길이를 넘어가면 추가 색상은 랜덤하게 반환하도록 설정
    if (groupIndex >= colors.length) {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // 랜덤 색상 생성
    }

    return colors[groupIndex];
  };

  // NovelBox와 동시 스크롤
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      onScroll(scrollAreaRef.current.scrollTop);
    }
  };

  return (
    <>
      {data ? (
        <GlassBox hasData={true}>
          <TitleText>등장인물 인식 결과</TitleText>
          <ContentBox style={{ height: '27rem' }}>
            <ScrollText ref={scrollAreaRef} onScroll={handleScroll}>
              {renderWords()}
            </ScrollText>
          </ContentBox>
          <TitleText>등장인물</TitleText>
          <CharacterChipList characterList={characterList} />
        </GlassBox>
      ) : (
        <GlassBox hasData={false}>
          <TutorialBox>
            <TutorialTitle>#1 소설 원고 입력하기</TutorialTitle>
            <TutorialText>
              1. 좌측에 소설 원고를 작성합니다.
              <br />
              2. <HighlightedText>등장인물 인식 버튼</HighlightedText>을 누릅니다.
              <br />
              3. 등장인물 목록을 확인하고 수정합니다.
            </TutorialText>
          </TutorialBox>
          <ConvertButton>등장인물 인식</ConvertButton>
        </GlassBox>
      )}
    </>
  );
};

export default CharacterBox;

interface HighlightedWordProps {
  highlightColor: string;
}

const HighlightedWord = styled.p<HighlightedWordProps>`
  display: inline;
  background-color: ${(props) => props.highlightColor};
`;
