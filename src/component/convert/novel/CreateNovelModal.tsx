import Modal from 'react-modal';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { CreateNovelModalStyle } from '../../../styles/convertBoxStyles';
import { ChangeEvent, useState } from 'react';
import CreateNovelCharacterChipList from './CreateNovelCharacterChipList';
import { mutationKeys } from '../../../utils/queryKeys';
import { useMutation } from '@tanstack/react-query';
import { useConvert } from '../../../hooks/useConvert';
import { useNovelData } from '../../../context/convertDataContext';
import { useConvertStep } from '../../../context/convertStepContext';

interface ModalProps {
  isOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

const CreateNovelModal = ({
  isOpen,
  setModalIsOpen,
  setIsLoading,
}: ModalProps) => {
  const [location, setLocation] = useState('');
  const [characterList, setCharacterList] = useState<string[]>([]);
  const [situation, setSituation] = useState('');
  const { createNovel } = useConvert();
  const { setText } = useNovelData();
  const { step, setStep } = useConvertStep(); // 변환 단계 관리

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSituationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSituation(event.target.value);
  };

  // create novel
  const CreateNovelMutate = useMutation({
    mutationKey: mutationKeys.mutationCreateNovel,
    mutationFn: () => createNovel(location, characterList, situation),
    onSuccess: (result) => {
      setIsLoading(false);
      setText(result.novel);

      // step 값 update
      step[0] = true;
      setStep([...step]);

      // 데이터 초기화
      setLocation('');
      setCharacterList([]);
      setSituation('');
    },
    onError: () => {
      console.log('create novel failure.');
    },
  });

  const handleButtonClick = () => {
    setModalIsOpen(false);
    setIsLoading(true);

    // api 호출
    CreateNovelMutate.mutate();
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
        <div style={{ height: '1rem' }} />
        <Button onClick={handleButtonClick}>소설 생성하기!</Button>
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
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.colors.brown};
  color: white;
`;

export default CreateNovelModal;
