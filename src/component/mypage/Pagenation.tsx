import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as PagePrev } from '../../assets/icons/page_prev_icon.svg';
import { ReactComponent as PageNext } from '../../assets/icons/page_next_icon.svg';

type pagenationProps = {
  page: number;
  setPage: (page: number) => void;
  totalScript: number;
  animate: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

const Pagenation = ({
  page,
  setPage,
  totalScript,
  animate,
  hasPrevious,
  hasNext,
}: pagenationProps) => {
  const btnRange = 5; // 페이지네이션 버튼 수
  const pageRange = 6; // 한 페이지당 목록 수
  const currentSet = Math.ceil(page / btnRange); // 현재 버튼이 몇 번째 세트인지 나타내는 수
  const startPage = (currentSet - 1) * btnRange + 1; // 현재 보여질 버튼의 첫 번째 수
  const endPage = startPage + btnRange - 1; // 현재 보여질 끝 버튼의 수
  const totalSet = Math.ceil(Math.ceil(totalScript / pageRange) / btnRange); // 전체 버튼 세트 수

  const handleClick = (index: number) => {
    animate(); // animation
    setPage(startPage + index); // page setting
  };

  const pageItems = Array(btnRange)
    .fill(startPage)
    .map((_, index) => {
      return (
        // isPost: 특정 페이지에 게시물 있는지 여부 확인
        <PageItem
          key={index}
          onClick={() => handleClick(index)}
          $active={page === startPage + index}
          $isPost={totalScript - pageRange * (startPage + index - 1)}
        >
          {startPage + index}
        </PageItem>
      );
    });
  return (
    <PagenationWrapper>
      {currentSet > 1 && (
        <ArrowButton onClick={() => setPage(startPage - 1)}>
          <PagePrev />
        </ArrowButton>
      )}
      <PagenationContainer>{pageItems}</PagenationContainer>
      {totalSet > currentSet && (
        <ArrowButton onClick={() => setPage(endPage + 1)}>
          <PageNext />
        </ArrowButton>
      )}
    </PagenationWrapper>
  );
};

// wrapper, container
const PagenationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const PagenationContainer = styled.div`
  width: 5rem; // hover 효과로 item의 크기가 커져도 페이지네이션이 움직이지 않도록 값 지정
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

// component
const PageItem = styled.div<{ $active: boolean; $isPost: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.brown};
  transition: width 0.5s ease, height 0.5s ease;

  &:hover {
    width: 3.5rem;
    height: 3.5rem;
  }

  ${(props) =>
    props.$active &&
    css`
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.2rem;
      background-color: ${({ theme }) => theme.colors.orange};
      color: ${({ theme }) => theme.colors.ivory};
      transition: width 0.5s ease, height 0.5s ease;

      &:hover {
        width: 4.5rem;
        height: 4.5rem;
      }
    `}
  ${(props) =>
    props.$isPost <= 0 &&
    css`
      display: none;
    `}
`;

const ArrowButton = styled.button``;

export default Pagenation;
