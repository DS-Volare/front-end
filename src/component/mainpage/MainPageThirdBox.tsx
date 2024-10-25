import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import exampleOne from '../../assets/background/example-1.png';
import exampleTwo from '../../assets/background/example-2.png';
import LoginModal from '../base/LoginModal';
import {
  ContentText,
  SubTitleText,
  ExplainGridBox,
} from '../../styles/mainStyles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const MainPageThirdBox = () => {
  const navigate = useNavigate();
  const { getTokenUser } = useUser();
  // temp useState
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const { isCheckUser } = getTokenUser();
    if (Boolean(isCheckUser)) setIsLogin(true);
  }, []);

  const moveToPage = () => {
    if (isLogin) navigate('/convert');
    else {
      setModalIsOpen(!modalIsOpen);
    }
  };

  // 설명 박스의 내용
  const explainContents = () => {
    return (
      <>
        <LoginModal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        <SubTitleText $page="second">
          #2 스토리보드 생성과 챗봇 기능
        </SubTitleText>
        <div style={{ height: '1rem' }} />
        <ContentText $page="second">
          1. 변환된 대본으로&nbsp;
          <ContentText $page="second" style={{ color: '#EA7333' }}>
            스토리보드
          </ContentText>
          를 생성 <br />
        </ContentText>
        <ContentText $page="second">
          2.&nbsp;
          <ContentText $page="second" style={{ color: '#EA7333' }}>
            챗봇
          </ContentText>
          으로 대본 수정 및 각색 작업 진행
        </ContentText>
      </>
    );
  };

  return (
    <LayoutWrapper>
      <ContentText $page={'third'}>
        변환된 대본을 기반으로 스토리보드 생성과 챗봇 기능을 제공합니다.
      </ContentText>
      <ExampleContainer>
        <ExampleBox>
          <ExampleImage style={{ backgroundImage: `url(${exampleOne})` }} />
          <SubTitleText style={{ textAlign: 'right' }} $page={'third'}>
            스토리보드 예시 화면
          </SubTitleText>
          <div style={{ height: '3rem' }} />
        </ExampleBox>
        <ExampleBox>
          <div style={{ height: '3rem' }} />
          <SubTitleText $page={'third'}>챗봇과의 채팅 예시 화면</SubTitleText>
          <ExampleImage style={{ backgroundImage: `url(${exampleTwo})` }} />
        </ExampleBox>
        {/* example */}
      </ExampleContainer>
      <ExplainGridBox $page={'third'}>{explainContents()}</ExplainGridBox>
      <ConvertButton onClick={moveToPage}>서비스 사용해보기!</ConvertButton>
    </LayoutWrapper>
  );
};

// wrapper, container
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ExampleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const ExampleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

// component
const ExampleImage = styled.img`
  width: 30vw;
  height: 45vh;
  border-radius: 0.5rem;
  background-size: cover;
`;

// component
const ConvertButton = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 8vw;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 13rem;
  height: 2.5rem;

  background: linear-gradient(90deg, #959b88, #58613e);
  color: white;
  border-radius: 2rem;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);

  user-select: none;
  cursor: pointer;
`;

export default MainPageThirdBox;
