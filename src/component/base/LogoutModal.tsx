import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { ModalCustomStyle } from '../../styles/mainStyles';
import { Toast } from '../../styles/ToastStyle';
import { toastText } from '../../utils/toastText';
import { useConvert } from '../../hooks/useConvert';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
}

const LogoutModal = ({ isOpen, setModalIsOpen, setIsLogin }: ModalProps) => {
  const { logout } = useAuth();
  const { clearConvertData } = useConvert();

  const handleLogout = async () => {
    const complete = await logout();
    // 로그아웃 성공 여부 처리
    if (complete) {
      setModalIsOpen(false);
      setIsLogin(false);
      clearConvertData(); // context 데이터 비움
      Toast.success(toastText.logoutSuccess);
    } else {
      setModalIsOpen(false);
      Toast.error(toastText.logoutError);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={ModalCustomStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      {/* exit */}
      <ExitContainer></ExitContainer>
      {/* content */}
      <LayoutContainer>
        <Text style={{ color: theme.colors.darkBrown }}>
          로그아웃 하시겠습니까?
        </Text>
        <div style={{ height: '80px' }} />
        <ButtonBox>
          <Button
            onClick={handleLogout}
            style={{ backgroundColor: theme.colors.olive }}
          >
            네
          </Button>
          <Button
            onClick={() => setModalIsOpen(false)}
            style={{
              backgroundColor: theme.colors.beige,
              color: theme.colors.darkBrown,
            }}
          >
            아니요
          </Button>
        </ButtonBox>
      </LayoutContainer>
    </Modal>
  );
};

// text
const Text = styled.span`
  font-size: 1rem;
`;

// container
const ExitContainer = styled.div`
  display: flex;
  height: 2rem;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

// conponent
const Button = styled.button`
  text-align: center;
  width: 10rem;
  padding: 0.8rem 0;
  font-size: 0.8rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

export default LogoutModal;
