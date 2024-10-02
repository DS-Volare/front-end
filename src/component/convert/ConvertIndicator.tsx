import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  ConvertStepProvider,
  useConvertStep,
} from '../../context/convertStepContext';

interface IndicatorProps {
  // 모든 단계를 거쳤는지 여부
  select: number;
  setSelect: (select: number) => void;
  stepTabs: Array<UseMoveScrollReturn>;
}

type UseMoveScrollReturn = {
  name: string;
  onMoveElement: () => void;
  element: React.RefObject<HTMLDivElement>;
};

type boxProps = {
  selected: number;
  index: number;
  step: boolean;
};

const ConvertIndicator = ({ select, setSelect, stepTabs }: IndicatorProps) => {
  const { step } = useConvertStep();

  return (
    <IndicatorContainer>
      {stepTabs.map((item, index) => {
        return (
          <IndicatorBox
            disabled={step[index]}
            step={step[index]}
            key={index}
            selected={select}
            index={index}
            onClick={() => {
              setSelect(index);
              item.onMoveElement();
            }}
          >
            {item.name}
          </IndicatorBox>
        );
      })}
    </IndicatorContainer>
  );
};

const IndicatorContainer = styled.div`
  display: flex;
  gap: 5px;
`;

// step에 따라서 disabled 설정하기
const IndicatorBox = styled.button.attrs((props) => ({
  disabled: !props.disabled ? true : undefined,
}))<boxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  height: 30px;
  padding: 1.1rem;
  font-size: 1rem;

  background-color: ${({ theme }) => theme.colors.beige};
  color: ${({ theme }) => theme.colors.brown};
  font-weight: bold;

  ${({ selected, index, step, theme }) => css`
    ${step &&
    css`
      background-color: ${theme.colors.orange};
      color: white;
    `}

    ${selected === index &&
    css`
      background-color: ${theme.colors.darkOrange};
      color: white;
    `}
  `}
`;

export default ConvertIndicator;
