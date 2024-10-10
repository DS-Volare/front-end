import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as FileDownloadIcon } from '../../../assets/icons/file_download_icon.svg';
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
  FileButton,
} from '../../../styles/convertBoxStyles';
import { useAnimationContext } from '../../../context/animationContext';
import { useConvertStep } from '../../../context/convertStepContext';
import SceneList from './SceneList';
import { useConvert } from '../../../hooks/useConvert';
import {
  useCharaterData,
  useNovelData,
  useScriptData,
  useScriptIdData,
} from '../../../context/convertDataContext';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../../utils/queryKeys';
import Spinner from '../../base/Spinner';
import { spinnerText } from '../../../utils/spinnerText';
import { Toast } from '../../../styles/ToastStyle';
import { toastText } from '../../../utils/toastText';

type props = {
  onMoveScroll: () => void;
  setSelect: (select: number) => void;
};

const ScriptBox = forwardRef<HTMLDivElement, props>(
  ({ onMoveScroll, setSelect }, ref) => {
    const { controlScripts, controlStoryboard, startAnimation } =
      useAnimationContext(); // 변환 컴포넌트 애니메이션 컨트롤

    const { text } = useNovelData();
    const { characterList } = useCharaterData();
    const { setScript } = useScriptData();
    const { setScriptId } = useScriptIdData();

    const { step, setStep } = useConvertStep(); // 변환 단계 관리
    const { convertScript } = useConvert();
    const [isClick, setIsClick] = useState<boolean>(false); // 버튼 클릭했을 시 true

    const ScriptMutate = useMutation({
      mutationKey: mutationKeys.mutateScript,
      mutationFn: () => convertScript(characterList, text),
      onSuccess: (result) => {
        setScript(result.script);
        setScriptId(result.scriptId);
        console.log(result.scriptId);

        step[2] = true;
        setStep([...step]);

        // 인디케이터 select 값 변경
        setSelect(2); // 스토리보드로 이동

        // 애니메이션
        onMoveScroll();
        setTimeout(() => {
          startAnimation(controlStoryboard);
        }, 1000);
      },
      onError: () => {
        console.log('update failure.');
      },
      onSettled: () => {
        console.log('call cognizeCharacter API');
      },
    });

    const handleClick = async () => {
      setIsClick(true); // 버튼 클릭했을 시 다음 단계가 보이도록
      ScriptMutate.mutate();
    };

    const errorProcess = () => {
      setIsClick(false);
      Toast.error(toastText.scriptError);
    };

    return (
      <motion.div
        ref={ref}
        animate={controlScripts}
        style={{ display: 'none', opacity: 0 }}
      >
        {isClick ? (
          <GlassBox $hasData={true}>
            {!ScriptMutate.isPending ? (
              <>
                {ScriptMutate.isSuccess && (
                  <>
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
                  </>
                )}
                {ScriptMutate.isError && errorProcess()}
              </>
            ) : (
              <Spinner text={spinnerText.scripts} />
            )}
          </GlassBox>
        ) : (
          <GlassBox $hasData={false}>
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
            <ConvertButton disabled={true} onClick={handleClick} $isWrite={true}>
              대본 변환
            </ConvertButton>
          </GlassBox>
        )}
      </motion.div>
    );
  }
);

export default ScriptBox;
