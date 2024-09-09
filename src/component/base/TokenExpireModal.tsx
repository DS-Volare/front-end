import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { ModalCustomStyle } from '../../styles/mainStyles';
import { Toast } from '../../styles/ToastStyle';
import { toastText } from '../../utils/toastText';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
}

const TokenExpireModal = ({ isOpen, setModalIsOpen }: ModalProps) => {
  const { logout } = useAuth();
  console.log('ㅇㅇ;', isOpen, setModalIsOpen);

  const handleLogout = async () => {
    const complete = await logout();
    // 로그아웃 성공 여부 처리
    if (complete) {
      setModalIsOpen(false);
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
          오랫동안 접속하지 않아 로그아웃 처리가 되었어요! {'\n'}
          다시 재로그인 하시겠어요?
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

export default TokenExpireModal;
