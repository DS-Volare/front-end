import React, { ChangeEvent, useEffect, useRef, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FileUploadIcon } from '../assets/icons/file_upload_icon.svg';
import { GlassBox, TitleText, ContentBox, FileButton, ScrollTextArea } from '../styles/convertBoxStyles';

type props = {
  data: string;
  onScroll: (scrollTop: number) => void;
  scrollTop: number;
};

const NovelBox = ({ data, onScroll, scrollTop }: props) => {
  const [text, setText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 파일 업로드
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setText(result);
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
  };

  // CharacterBox와 동시 스크롤
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const handleScroll = () => {
    if (textareaRef.current) {
      onScroll(textareaRef.current.scrollTop);
    }
  };

  return (
    <GlassBox hasData={data ? true : false}>
      <TitleText>원고 작성</TitleText>
      <FileButton onClick={handleButtonClick}>
        <FileUploadIcon width="2rem" height="2rem" />
        &nbsp;파일 업로드
      </FileButton>
      <HiddenFileInput type="file" accept=".txt" ref={fileInputRef} onChange={handleFileUpload} />
      <ContentBox>
        <ScrollTextArea
          value={text}
          onChange={handleTextChange}
          wrap="soft"
          placeholder="내용을 입력하거나 텍스트 파일을 첨부하세요."
          ref={textareaRef}
          onScroll={handleScroll}
        />
      </ContentBox>
    </GlassBox>
  );
};

export default NovelBox;

const HiddenFileInput = styled.input`
  display: none;
`;
