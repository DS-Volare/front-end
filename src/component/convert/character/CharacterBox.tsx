import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CharacterChipList from './CharacterChipList';
import {
  GlassBox,
  TitleText,
  ContentBox,
  ScrollText,
  TutorialBox,
  TutorialTitle,
  TutorialText,
  HighlightedText,
  ConvertButton,
} from '../../../styles/convertBoxStyles';
import { useAnimationContext } from '../../../context/animationContext';
import { motion } from 'framer-motion';
import { useConvertStep } from '../../../context/convertStepContext';
import { useConvert } from '../../../hooks/useConvert';
import {
  useCharaterData,
  useNovelData,
  useNovelIdData,
  useNovelTitleData,
} from '../../../context/convertDataContext';
import Spinner from '../../base/Spinner';
import { spinnerText } from '../../../utils/spinnerText';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys, queryKeys } from '../../../utils/queryKeys';
import { Toast } from '../../../styles/ToastStyle';
import { toastText } from '../../../utils/toastText';

interface Props {
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
  onMoveScroll: () => void;
  setSelect: (select: number) => void;
}

type highlitingType = {
  text: string;
  sent_id: number;
  start_eid: number;
  end_eid: number;
};

const CharacterBox = ({
  onScroll,
  scrollTop,
  onMoveScroll,
  setSelect,
}: Props) => {
  const { characterList, setCharacterList } = useCharaterData();
  const { text } = useNovelData();
  const { title } = useNovelTitleData();
  const { setNovelId } = useNovelIdData();

  const { controlScripts, startAnimation } = useAnimationContext(); // 변환 컴포넌트 애니메이션 컨트롤
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { step, setStep } = useConvertStep(); // 변환 단계 관리
  const { saveNovel, cognizeCharacter } = useConvert();
  const [isClick, setIsClick] = useState<boolean>(false); // 버튼 클릭했을 시 true

  const [inputSentences, setInputSentences] = useState<string[][]>([]);
  const [resultData, setResultData] = useState<highlitingType[][]>([]);

  // 각 어절을 div로 렌더링
  const renderWords = () => {
    return inputSentences.map((sentence, sentIndex) =>
      sentence.map((word, eid) => {
        const highlightInfo = resultData.find((dataGroup) =>
          dataGroup.some(
            (data) =>
              data.sent_id === sentIndex &&
              data.start_eid <= eid &&
              data.end_eid >= eid
          )
        );

        if (!highlightInfo) {
          return (
            <HighlightedWord
              key={`${sentIndex}-${eid}`}
              highlightColor="transparent"
            >
              {word}&nbsp;
            </HighlightedWord>
          );
        }

        // highlightInfo가 포함된 groupIndex 찾기
        const groupIndex = resultData.findIndex((dataGroup) =>
          dataGroup.some(
            (data) =>
              data.sent_id === sentIndex &&
              data.start_eid <= eid &&
              data.end_eid >= eid
          )
        );

        // groupIndex에 따라 색상 설정
        const highlightColor = getHighlightColor(groupIndex);

        return (
          <>
            <HighlightedWord
              key={`${sentIndex}-${eid}`}
              highlightColor={highlightColor}
            >
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

  // fetch, 추후에 낙관적 업데이트를 위한 onMutate 함수 추가
  const CharacterMutate = useMutation({
    mutationKey: mutationKeys.mutateCharacterList,
    mutationFn: () => cognizeCharacter(text),
    onSuccess: (result) => {
      // 성공했을 때 실행
      console.log('update review success.');
      setCharacterList(result.center_character); // 등장인물 저장
      setInputSentences(result.total_words); // 소설 원문 저장
      setResultData(result.words_index); // 하이라이팅

      // 인디케이터 활성 및 변환 플로우
      step[1] = true;
      setStep([...step]);

      // 인디케이터 select 값 변경
      setSelect(1); // 대본으로 이동

      // 애니메이션
      onMoveScroll();
      setTimeout(() => {
        startAnimation(controlScripts);
      }, 1000);
    },
    onError: () => {
      // fail
      console.log('update failure.');
    },
    onSettled: () => {
      // 성공, 실패 상관없이 실행
      console.log('call cognizeCharacter API');
    },
  });

  const NovelSaveMutate = useMutation({
    mutationKey: mutationKeys.mutateSaveNovel,
    mutationFn: () => saveNovel(title, text),
    onSuccess: (result) => {
      // 추후에 toast 추가
      setNovelId(result.result.novelId); // 소설 id 저장
    },
    onError: () => {
      console.log('update failure.');
    },
    onSettled: () => {
      console.log('call NovelSaveMutate API');
    },
  });

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      onScroll(scrollAreaRef.current.scrollTop);
    }
  };

  const handleClick = async () => {
    setIsClick(true); // 버튼 클릭했을 시 다음 단계가 보이도록
    // func: 소설 저장
    NovelSaveMutate.mutate();

    // func: 등장인물 인식
    CharacterMutate.mutate();
  };

  const errorProcess = () => {
    setIsClick(false);
    Toast.error(toastText.characterError);
  };

  return (
    <motion.div>
      {isClick ? (
        // temporary
        <GlassBox hasData={true}>
          {!CharacterMutate.isPending ? (
            <>
              {CharacterMutate.isSuccess && (
                <>
                  <TitleText>등장인물 인식 결과</TitleText>
                  <ContentBox style={{ height: '27rem' }}>
                    <ScrollText ref={scrollAreaRef} onScroll={handleScroll}>
                      {renderWords()}
                    </ScrollText>
                  </ContentBox>
                  <TitleText>등장인물</TitleText>
                  <CharacterChipList />
                </>
              )}
              {CharacterMutate.isError && errorProcess()}
            </>
          ) : (
            <Spinner text={spinnerText.character} />
          )}
        </GlassBox>
      ) : (
        <GlassBox hasData={false}>
          <TutorialBox>
            <TutorialTitle>#1 소설 원고 입력하기</TutorialTitle>
            <TutorialText>
              1. 좌측에 소설 원고를 작성합니다.
              <br />
              2. <HighlightedText>등장인물 인식 버튼</HighlightedText>을
              누릅니다.
              <br />
              3. 등장인물 목록을 확인하고 수정합니다.
            </TutorialText>
          </TutorialBox>
          {/* 소설 작성 후 버튼 활성화 */}
          <ConvertButton
            disabled={step[0]}
            onClick={handleClick}
            isWrite={step[0]}
          >
            등장인물 인식
          </ConvertButton>
        </GlassBox>
      )}
    </motion.div>
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
