import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { ReactComponent as NavLogo } from '../../assets/icons/nav_logo_icon.svg';
import { useUser } from '../../hooks/useUser';
import LogoutModal from './LogoutModal';

const NavBar = () => {
  const navigate = useNavigate();
  const { getTokenUser } = useUser();

  // temp useState
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
  const { updateUser } = useUser();

  useEffect(() => {
    const { isCheckUser } = getTokenUser();
    if (Boolean(isCheckUser)) {
      setIsLogin(true);
    } else {
      updateUser(); // 유저 정보 업데이트
    }
  }, []);

  const navigateConvertScript = () => {
    const { isCheckUser } = getTokenUser();
    if (Boolean(isCheckUser)) {
      navigate('/convert');
    } else {
      openModalFunc(); // 로그인 모달 띄우기
    }
  };

  const navigateMypage = () => {
    navigate('/mypage');
  };

  const navigateMainPage = () => {
    navigate('/main');
  };

  const openModalFunc = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleLogout = async () => {
    setLogoutModalIsOpen(!logoutModalIsOpen);
  };

  return (
    <Container>
      <LoginModal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <LogoutModal
        isOpen={logoutModalIsOpen}
        setModalIsOpen={setLogoutModalIsOpen}
        setIsLogin={setIsLogin}
      />
      <MainLogo>
        <NavLogo width={50} onClick={navigateMainPage} />
      </MainLogo>
      <MenuText onClick={navigateConvertScript}>대본 변환</MenuText>
      <div style={{ flex: 1 }} />
      {!isLogin ? (
        <>
          <MenuText onClick={openModalFunc}>로그인</MenuText>
        </>
      ) : (
        <>
          <MenuText onClick={navigateMypage}>마이페이지</MenuText>
          <MenuText onClick={handleLogout}>로그아웃</MenuText>
        </>
      )}
    </Container>
  );
};

// text
const MenuText = styled.div`
  font-size: 1.15rem;
  color: white;
  padding: 1rem;
  user-select: none;
  cursor: pointer;
`;

// container
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 50px;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.olive};
`;

const MainLogo = styled.div`
  cursor: pointer;
`;

export default NavBar;
