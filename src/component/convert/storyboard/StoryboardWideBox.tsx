import React, { forwardRef, useEffect, useState } from 'react';
import { ReactComponent as FileDownloadIcon } from '../../../assets/icons/file_download_icon.svg';
import {
  GlassBox,
  TitleText,
  ContentBox,
  TutorialBox,
  TutorialTitle,
  TutorialText,
  HighlightedText,
  ConvertButton,
  FileButton,
  ScrollText,
} from '../../../styles/storyboardStyles';
import StoryboardInfo from './StoryboardWideInfo';
import CutList from './WideCutList';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../../../context/animationContext';
import { useConvertStep } from '../../../context/convertStepContext';
import {
  useScriptData,
  useScriptIdData,
  useStoryboardData,
} from '../../../context/convertDataContext';
import { sb1 } from './storyboardDummy';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../../utils/queryKeys';
import { useConvert } from '../../../hooks/useConvert';
import Spinner from '../../base/Spinner';
import { spinnerText } from '../../../utils/spinnerText';


const StoryboardWideBox = forwardRef<HTMLDivElement>(
  ({}, ref) => {
    const { controlStatistics, controlStoryboard, startAnimation } =
      useAnimationContext(); // 변환 컴포넌트 애니메이션 컨트롤

    const { storyboard, setStoryboard } = useStoryboardData();
    setStoryboard(sb1);

    return (
      <motion.div ref={ref} animate={controlStoryboard} style={{ opacity: 100 }}>
          <GlassBox $hasData={true}>
                    <TitleText>스토리보드</TitleText>
                    <FileButton>
                      <FileDownloadIcon width="2rem" height="2rem" />
                      &nbsp;다운로드
                    </FileButton>
                    <ContentBox>
                      <ScrollText>
                        {storyboard.scene.map((s, index) => (
                          <>
                            <StoryboardInfo
                              data={{
                                scene_num: s.scene_num,
                                summary: s.summary,
                                location: s.location,
                                cutCount: s.content!.length,
                              }}
                            />
                            <CutList cuts={s.content!} />
                          </>
                        ))}
                      </ScrollText>
                    </ContentBox>
          </GlassBox>
      </motion.div>
    );
  }
);

export default StoryboardWideBox;
