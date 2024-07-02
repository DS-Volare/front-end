import styled from 'styled-components';

export const TitleText = styled.div`
  font-weight: bold;
  color: white;
  font-size: 2rem;
  padding: 1rem;
`;

export const ContentBox = styled.div`
  background-color: white;
  width: auto;
  height: 90%;
  border-radius: 20px;
  padding: 1.25rem;
`;

export const ScrollText = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  line-height: 1.8;

  white-space: pre-wrap;
  overflow-y: scroll;
  overflow-wrap: break-word;
`

export const ScrollTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  line-height: 1.8;

  font-family: 'BookkMyungjo';
  white-space: pre-wrap;
  overflow-y: scroll;
  overflow-wrap: break-word;

  resize: none;  
  &:focus {
    outline: none;
  }
`

export const TutorialBox = styled.div`
  width: 80%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  text-align: center;
  margin: 20% 0;
`;

export const TutorialTitle = styled.h1`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.darkOlive};
  margin: 2rem 0;
  font-weight: bold;
`;

export const TutorialText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkOlive};
  line-height: 2;
  text-align: center;
  margin: 2rem;
`;

export const HighlightedText = styled.span`
  color: ${({ theme }) => theme.colors.darkOrange};
  font-weight: bold;
`;

export const ConvertButton = styled.button`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.orange}, #84411d);
  color: #ffffff;
  border: none;
  border-radius: 3rem;
  padding: 1rem 3rem;
  cursor: pointer;
  font-size: 1.25rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const FileButton = styled.div`
  width: 12.5rem;
  text-align: center;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.darkOrange};
  border-radius: 0.625rem 0.625rem 0 0;
  position: absolute;
  top: 2rem;
  right: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`