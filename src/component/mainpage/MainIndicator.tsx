import styled, { css } from 'styled-components';
import { motion, AnimationControls } from 'framer-motion';
import {
  useMainAnimationContext,
  usePageContext,
} from '../../context/mainAnimationContext';
import { useScreenTransitionAnimation } from '../../hooks/useScreenTransitionAnimation';

interface boxProps {
  selected: number;
  $index: number;
}

const MainIndicator = () => {
  const IndicatorName: string[] = [
    '서비스 소개',
    '체험하기',
    '서비스 사용하기',
  ];

  const { page, setPage } = usePageContext();
  const { controlIndicater } = useMainAnimationContext(); // 애니메이션을 적용할 컨트롤러 context
  const { transitionClickAnimation } = useScreenTransitionAnimation();

  const handleClick = (page: number) => {
    transitionClickAnimation(page);
  };

  return (
    <IndicatorContainer>
      {IndicatorName.map((item, index) => {
        return (
          <IndicatorBox
            key={index}
            onClick={() => handleClick(index + 1)}
            animate={controlIndicater}
          >
            <IndicatorText selected={page} $index={index + 1}>
              {item}
            </IndicatorText>
            <IndicatorShape selected={page} $index={index + 1} />
          </IndicatorBox>
        );
      })}
    </IndicatorContainer>
  );
};

// container
const IndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-self: flex-start;
  align-items: flex-end;
`;

const IndicatorBox = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const IndicatorText = styled.span<boxProps>`
  user-select: none;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.brown};
  ${({ selected, $index }) =>
    selected === $index &&
    css`
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.darkOrange};
    `}
`;

const IndicatorShape = styled.div<boxProps>`
  width: 2rem;
  height: 2rem;
  background-color: gray;
  border-radius: 5rem;
  user-select: none;
  cursor: pointer;
  ${({ selected, $index }) =>
    selected === $index &&
    css`
      width: 2.5rem;
      height: 2.5rem;
      background-color: ${({ theme }) => theme.colors.orange};
    `}

  transition: width 0.5s ease, height 0.5s ease;
  &:hover {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export default MainIndicator;
