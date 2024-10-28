import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CreateNovelCharacterChip from './CreateNovelCharacterChip';

const calculateWidth = (str: string): number => {
  return new TextEncoder().encode(str).length * 0.58;
};

type CreateNovelCharType = {
  characterList: string[];
  setCharacterList: React.Dispatch<React.SetStateAction<string[]>>;
};

const CreateNovelCharacterChipList = ({
  characterList,
  setCharacterList,
}: CreateNovelCharType) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [addVisible, setAddVisible] = useState(true);

  const addChip = () => {
    if (inputValue) {
      setCharacterList([...characterList, inputValue]);
      setInputValue('');
      setInputVisible(false);
      setAddVisible(true);
    }
  };

  const removeChip = (index: number) => {
    const newChips = characterList.filter((_, i) => i !== index);
    setCharacterList(newChips);
  };

  const handleAddButtonClick = () => {
    setInputVisible(!inputVisible);
    setAddVisible(!addVisible);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = e.target.value;
      setInputValue(value);
      const width = calculateWidth(value);
      e.target.style.width = `${width + 6}ch`;
    }
  };

  const handleOnblur = () => {
    if (inputValue) {
      addChip();
    } else {
      setInputVisible(false);
      setAddVisible(true);
    }
  };

  return (
    <ChipContainer>
      {characterList.map((character, index) => (
        <CreateNovelCharacterChip
          key={index}
          label={character}
          onDelete={() => removeChip(index)}
        />
      ))}
      {inputVisible && (
        <ChipInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && addChip()}
          onBlur={handleOnblur}
        />
      )}
      {addVisible && <AddButton onClick={handleAddButtonClick}>+</AddButton>}
    </ChipContainer>
  );
};

export default CreateNovelCharacterChipList;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const ChipInput = styled.input`
  border: none;
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 0.625rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'BookkMyungjo';
  width: 5rem;
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.orange};
  }
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.orange};
  border: none;
  border-radius: 2rem;
  width: 3rem;
  height: 3rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.darkBrown};
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
`;
