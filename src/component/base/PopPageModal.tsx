import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ModalCustomStyle } from '../../styles/mainStyles';
import { useConvert } from '../../hooks/useConvert';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
}

const PopPageModal = ({ isOpen, setModalIsOpen }: ModalProps) => {
  const navigate = useNavigate();
  const { clearConvertData } = useConvert();
  const handleButtonClick = () => {
    setModalIsOpen(false);
    clearConvertData(); // convert context data 삭제
    window.history.back();
  };

  const handleCancelClick = () => {
    setModalIsOpen(false);
    window.history.pushState(null, '', window.location.href);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={ModalCustomStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      {/* exit */}
      <ExitContainer></ExitContainer>
      {/* content */}
      <LayoutContainer>
        <Text style={{ color: theme.colors.darkBrown }}>
          뒤로가기 하실건가요? <br />
          뒤로가기 하면 데이터가 저장되지 않아요.
        </Text>
        <div style={{ height: '80px' }} />
        <ButtonBox>
          <Button
            onClick={handleButtonClick}
            style={{ backgroundColor: theme.colors.olive }}
          >
            네
          </Button>
          <Button
            onClick={handleCancelClick}
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
  text-align: center;
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

export default PopPageModal;
