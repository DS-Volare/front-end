import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface boxProps {
  selected: number;
  $index: number;
}

interface selectProps {
  select: number;
  setSelect: (select: number) => void;
}

const SampleNovelSelector = ({ select, setSelect }: selectProps) => {
  const sampleName: string[] = ['샘플 1', '샘플 2', '샘플 3', '샘플 4'];

  return (
    <IndicatorContainer>
      {sampleName.map((item, index) => {
        return (
          <IndicatorBox
            key={index}
            selected={select}
            $index={index}
            onClick={() => setSelect(index)}
          >
            {item}
          </IndicatorBox>
        );
      })}
    </IndicatorContainer>
  );
};

// container
const IndicatorContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const IndicatorBox = styled.div<boxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  max-width: 7rem;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.beige};
  color: ${({ theme }) => theme.colors.darkBrown};
  padding: 0 1.2rem;

  user-select: none;
  cursor: pointer;

  ${({ selected, $index }) =>
    selected === $index &&
    css`
      background-color: ${({ theme }) => theme.colors.darkOrange};
      color: white;
    `}
`;

export default SampleNovelSelector;
