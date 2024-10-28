import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { TitleText, SubTitleText, ContentText } from '../../styles/mainStyles';
import { ReactComponent as MainLogo } from '../../assets/icons/main_logo_icon.svg';
import { motion } from 'framer-motion';

const MainPageFirstBox = () => {
  const blank = '\u00A0\u00A0\u00A0';

  return (
    <LayoutWrapper>
      <TitleText>: Plotter</TitleText>
      <IntroduceBox>
        <ServiceLogoBox>
          <Circle type={'big'} />
          <Circle type={'medium'} />
          <Circle type={'small'} />
          <MainLogo style={{ position: 'relative' }} />
        </ServiceLogoBox>
        <ContentBox>
          <SubTitleContentBox>
            <SubTitleText $page={'first'}>소설을 대본으로</SubTitleText>
            <ContentText $page={'first'}>
              {blank}소설을 작성하면 대본으로 변환됩니다.
            </ContentText>
          </SubTitleContentBox>
          <SubTitleContentBox>
            <SubTitleText $page={'first'}>스토리보드 생성</SubTitleText>
            <ContentText $page={'first'}>
              {blank}변환된 대본을 기반으로 스토리보드를 생성합니다.
            </ContentText>
          </SubTitleContentBox>
          <SubTitleContentBox>
            <SubTitleText $page={'first'}>챗봇으로 대본 보완하기</SubTitleText>
            <ContentText $page={'first'}>
              {blank}챗봇에게 도움을 받아 대본을 보완할 수 있습니다.
            </ContentText>
          </SubTitleContentBox>
        </ContentBox>
      </IntroduceBox>
    </LayoutWrapper>
  );
};

type typeProps = {
  type: string;
};

// container
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 6rem;
  gap: 3rem;
`;

const IntroduceBox = styled.div`
  display: flex;
  gap: 4rem;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const SubTitleContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceLogoBox = styled.div`
  position: relative;
`;

// keyframes
const Gradient = keyframes`
    0% {
      transform: translateY(0px);
    }
    50%{
      transform: translateY(7px);
    }
    100% {
      transform: translateY(0px);
    }
`;

// compoenent
const Circle = styled(motion.div)<typeProps>`
  position: absolute;
  border-radius: 50rem;
  opacity: 0.7;

  ${({ type, theme }) => {
    switch (type) {
      case 'small':
        return css`
          width: 4rem;
          height: 4rem;
          background-color: ${theme.colors.ivory};
          top: 16rem;
          left: 8rem;

          animation: ${Gradient} 3s ease-in-out infinite;
        `;
      case 'medium':
        return css`
          width: 5rem;
          height: 5rem;
          background-color: ${theme.colors.orange};
          top: -2rem;
          left: 8rem;

          animation: ${Gradient} 5s ease-in-out infinite;
        `;
      case 'big':
        return css`
          width: 8rem;
          height: 8rem;
          background-color: ${theme.colors.olive};
          top: 8rem;
          left: -3rem;

          animation: ${Gradient} 7s ease-in-out infinite;
        `;
    }
  }}
`;

export default MainPageFirstBox;
