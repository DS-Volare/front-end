import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { CreateNovelModalStyle } from '../../../styles/convertBoxStyles';
import { ChangeEvent, useState } from 'react';
import CreateNovelCharacterChipList from './CreateNovelCharacterChipList';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  mutate: () => void;
}

const CreateNovelModal = ({ isOpen, setModalIsOpen, mutate }: ModalProps) => {
  const [location, setLocation] = useState('');
  const [characterList, setCharacterList] = useState<string[]>([]);
  const [situation, setSituation] = useState('');

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSituationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSituation(event.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={CreateNovelModalStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      {/* content */}
      <LayoutContainer>
        <Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          소설을 생성해볼까요?
        </Text>
        <div style={{ height: '1rem' }} />
        {/* 장소 */}
        <ContentBox>
          <Text>1. 소설 속 배경을 작성해주세요.</Text>
          <Input
            value={location}
            onChange={handleLocationChange}
            placeholder="예시: 학교 앞"
          />
        </ContentBox>
        {/* 등장인물 */}
        <ContentBox>
          <Text>2. 소설 속 등장인물을 작성해주세요.</Text>
          <CreateNovelCharacterChipList
            characterList={characterList}
            setCharacterList={setCharacterList}
          />
        </ContentBox>
        {/* 상황 */}
        <ContentBox>
          <Text>3. 소설 속 상황을 작성해주세요.</Text>
          <Input
            value={situation}
            onChange={handleSituationChange}
            placeholder="예시: 학교에서 함께 숙제를 하고 있는 상황"
          />
        </ContentBox>
      </LayoutContainer>
    </Modal>
  );
};

// text
const Text = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.darkBrown};
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
  gap: 2rem;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

// conponent
const Input = styled.input`
  width: 20rem;
  height: 2rem;
  background-color: rgb(255, 255, 255, 0.5);
  border-width: 0 0 1px 0;
  border-color: white;
  border-radius: 2rem;
  color: black;
  font-size: 0.9rem;
  padding: 0.4rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.brown};
  }
`;

const Button = styled.button`
  text-align: center;
  width: 270px;
  padding: 0.8rem 0;
  font-size: 0.8rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
`;

export default CreateNovelModal;
