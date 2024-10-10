import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SampleNovelSelector from './SampleNovelSelector';
import {
  SubTitleText,
  ContentText,
  ExplainGridBox,
} from '../../styles/mainStyles';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow_right_icon.svg';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../utils/queryKeys';
import axios from 'axios';

const MainPageSecondBox = () => {
  const [select, setSelect] = useState<number>(0);
  const [isClick, setIsClick] = useState<boolean>(false);
  const sampleNovel: string[] = [
    '샘플내용1',
    '샘플내용2',
    '샘플내용3',
    '샘플내용4',
  ];

  useEffect(() => {
    setIsClick(false); // 결과 text 초기화
  }, [select]);

  // fetch data
  const fetchDemo = async (select: number) => {
    const result = await axios.get(
      `/spring/scripts/sample/SAMPLE${select + 1}`
    );
    const data = result.data;

    return data;
  };

  const demoQuery = useQuery({
    queryKey: [queryKeys.demo, select],
    queryFn: () => fetchDemo(select),
    enabled: !!isClick, // isClick이 true일 때만 실행
  });

  // 설명 박스의 내용
  const explainContents = () => {
    return (
      <>
        <SubTitleText $page="second">#1 소설을 대본으로 변환하기</SubTitleText>
        <div style={{ height: '1rem' }} />
        <ContentText $page="second">
          1. 4개의 소설 샘플 중 하나의 샘플을 선택합니다. <br />
        </ContentText>
        <ContentText $page="second">
          2.&nbsp;
          <ContentText $page="second" style={{ color: '#EA7333' }}>
            대본 변환 버튼
          </ContentText>
          을 누릅니다. <br />
        </ContentText>
        <ContentText $page="second">
          3. 오른쪽 창에서 변환된 대본을 확인할 수 있습니다.
        </ContentText>
      </>
    );
  };

  return (
    <LayoutWrapper>
      <>
        <SampleContainer>
          <SampleNovelSelector select={select} setSelect={setSelect} />
          <TextBox>{sampleNovel[select]}</TextBox>
          <ConvertButton onClick={() => setIsClick(true)}>
            대본 변환
          </ConvertButton>
        </SampleContainer>
        <ArrowRightIcon />
        <SampleContainer>
          <div style={{ height: '30px' }} />
          <TextBox>
            {isClick &&
              !demoQuery.isLoading &&
              demoQuery.data.result.sampleScript}{' '}
          </TextBox>
          <div style={{ height: '2.5rem' }} />
        </SampleContainer>
        {/* explain */}
        <ExplainGridBox $page={'second'}>{explainContents()}</ExplainGridBox>
      </>
    </LayoutWrapper>
  );
};

// wrapper, container
const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const TextBox = styled.div`
  width: 30vw;
  height: 50vh;
  background-color: white;
  border-radius: 1.5rem;
  padding: 1rem;

  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  overflow-y: auto;
  overflow-x: hidden;

  line-height: 1.5;
`;

// component
const ConvertButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 2.5rem;

  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  font-weight: bold;
  border-radius: 2rem;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
`;

export default MainPageSecondBox;
