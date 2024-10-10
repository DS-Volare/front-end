import FooterBar from '../component/base/Footerbar';
import styled, { css, keyframes } from 'styled-components';
import bgImgFirst from '../assets/background/bg-2.png';
import bgImgSecond from '../assets/background/bg-3.png';
import bgImgThird from '../assets/background/bg-4.png';
import MainIndicator from '../component/mainpage/MainIndicator';
import MainPageFirstBox from '../component/mainpage/MainPageFirstBox';
import MainPageSecondBox from '../component/mainpage/MainPageSecondBox';
import MainPageThirdBox from '../component/mainpage/MainPageThirdBox';
import { motion } from 'framer-motion';
import {
  useMainAnimationContext,
  usePageContext,
} from '../context/mainAnimationContext';
import { useScreenTransitionAnimation } from '../hooks/useScreenTransitionAnimation';
import { useEffect } from 'react';
import { useTransitionBg } from '../hooks/useTransitionBg';

type pageProps = {
  page: number;
};

type bgImageProps = {
  $bgImage: string;
};

const MainPage = () => {
  const { page } = usePageContext();
  const { controlScreen } = useMainAnimationContext(); // 애니메이션을 적용할 컨트롤러 context
  const { transitionWheelAnimation } = useScreenTransitionAnimation();

  const transBgArr = [
    useTransitionBg(1),
    useTransitionBg(2),
    useTransitionBg(3),
  ];

  const pageTransitionFunc = () => {
    switch (page) {
      case 1:
        return <MainPageFirstBox />;
      case 2:
        return <MainPageSecondBox />;
      case 3:
        return <MainPageThirdBox />;
    }
  };

  useEffect(() => {
    transBgArr[page - 1].onTransitionBackground();
  }, [page]);

  return (
    <>
      <Background onWheel={transitionWheelAnimation}>
        <BackgroundImage $bgImage={bgImgFirst} ref={transBgArr[0].element} />
        <BackgroundImage $bgImage={bgImgSecond} ref={transBgArr[1].element} />
        <BackgroundImage $bgImage={bgImgThird} ref={transBgArr[2].element} />
        <BackgroundCover page={page}>
          <LayoutWrapper>
            {/* main content box */}
            <IntroduceContainer animate={controlScreen}>
              {pageTransitionFunc()}
            </IntroduceContainer>
            {/* indicator */}
            <div style={{ flex: 1 }} />
            <MainIndicator />
          </LayoutWrapper>
        </BackgroundCover>
      </Background>
      <FooterBar />
    </>
  );
};

// wrapper, container
const LayoutWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 5vh 5vw;
`;

const IntroduceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70vw; // before 1450px;
  height: 70vh; // before 700px;
  background-color: rgba(255, 255, 245, 0.6);
  padding: 3vh 3vw;

  border-style: solid;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.35);
  border-radius: 1.2rem;
`;

// background
const Background = styled.div`
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  ${css`
    height: calc(100vh - 160px);
  `}
`;

const BackgroundImage = styled.div<bgImageProps>`
  width: 100%;
  height: calc(100vh - 160px);
  background-size: cover;

  ${({ $bgImage }) => css`
    background-image: url(${$bgImage});
  `}
`;

const BackgroundCover = styled.div<pageProps>`
  backdrop-filter: blur(3px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 5rem 0;

  ${({ page }) => {
    switch (page) {
      case 1:
        return css`
          background-color: rgba(79, 73, 61, 0.6);
        `;
      case 2:
        return css`
          background-color: rgba(181, 181, 181, 0.5);
        `;
      case 3:
        return css`
          background-color: rgba(255, 252, 245, 0.5);
        `;
    }
  }}
`;

export default MainPage;
