import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useAuth } from '../../hooks/useAuth';
import { ModalCustomStyle } from '../../styles/mainStyles';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
}

const LoginModal = ({ isOpen, setModalIsOpen }: ModalProps) => {
  const { login } = useAuth();

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
          소셜 계정으로 로그인하기
        </Text>
        <div style={{ height: '80px' }} />
        <ButtonBox>
          <Button
            onClick={() => login('naver')}
            style={{ backgroundColor: 'rgba(45,180,0,0.7)', color: 'white' }}
          >
            네이버로 로그인
          </Button>
          <Button
            onClick={() => login('google')}
            style={{
              backgroundColor: theme.colors.beige,
              color: theme.colors.darkBrown,
            }}
          >
            구글로 로그인
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
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

// conponent
const Button = styled.button`
  text-align: center;
  width: 270px;
  padding: 0.8rem 0;
  font-size: 0.8rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

export default LoginModal;
