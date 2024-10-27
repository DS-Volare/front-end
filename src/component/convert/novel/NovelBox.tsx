import React, {
  ChangeEvent,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { ReactComponent as FileUploadIcon } from '../../../assets/icons/file_upload_icon.svg';
import {
  GlassBox,
  TitleText,
  ContentBox,
  FileButton,
  ScrollTextArea,
} from '../../../styles/convertBoxStyles';
import { useConvertStep } from '../../../context/convertStepContext';
import { useNovelData } from '../../../context/convertDataContext';
import CreateNovelModal from './CreateNovelModal';

type props = {
  data: string;
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
};

const NovelBox = forwardRef<HTMLDivElement, props>(
  ({ data, onScroll, scrollTop }, ref) => {
    //const [text, setText] = useState<string>('');
    const { text, setText } = useNovelData();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { step, setStep } = useConvertStep(); // 변환 단계 관리
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModalFunc = () => {
      setModalIsOpen(!modalIsOpen);
    };

    // 파일 업로드
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result && typeof result === 'string') {
            setText(result);
            // step 값 update
            step[0] = true;
            setStep([...step]);
          }
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid text file.');
      }
    };

    const handleButtonClick = () => {
      fileInputRef.current?.click(); // file input 요소를 클릭하여 파일 선택 대화 상자를 엽니다.
    };

    // textarea value
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value); // textarea의 value를 업데이트합니다.
      if (event.target.value !== '') {
        // textarea가 비어있지 않을 때
        step[0] = true;
        setStep([...step]);
      } else {
        step[0] = false;
        setStep([...step]);
      }
    };

    return (
      <div ref={ref}>
        <GlassBox $hasData={true}>
          <CreateNovelModal
            isOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            mutate={() => openModalFunc()}
          />
          <TitleText>원고 작성</TitleText>
          <CreateNovelButton onClick={() => openModalFunc()}>
            소설 생성
          </CreateNovelButton>
          <FileButton onClick={handleButtonClick}>
            <FileUploadIcon width="2rem" height="2rem" />
            &nbsp;파일 업로드
          </FileButton>
          <HiddenFileInput
            type="file"
            accept=".txt"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <ContentBox>
            <ScrollTextArea
              value={text}
              onChange={handleTextChange}
              wrap="soft"
              placeholder="내용을 입력하거나 텍스트 파일을 첨부하세요."
            />
          </ContentBox>
        </GlassBox>
      </div>
    );
  }
);

export default NovelBox;

const HiddenFileInput = styled.input`
  display: none;
`;

const CreateNovelButton = styled.button`
  position: absolute;
  top: 2.8rem;
  left: 12rem;
  width: 7rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.olive};
  border-radius: 2rem;
  color: white;
  font-size: 1rem;
`;
