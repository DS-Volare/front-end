import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  // 전역 스타일
  a{
      text-decoration: none;
      color: inherit;
  }
  *{
      box-sizing: border-box;
  }
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table{
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 16px;
      vertical-align: baseline;
      line-height: 1.2;
  }
  body{
      line-height: 1;
      font-family: 'BookkMyungjo';
  }
  ol, ul{
      list-style: none;
  }
  button {
      border: 0;
      background: transparent;
      cursor: pointer;
      font-family: 'BookkMyungjo';
  }
  input {
      font-family: 'BookkMyungjo';
      border: none;
      background: transparent;
      &:focus {
          outline: none;
      }
  }
  textarea {
      font-family: 'BookkMyungjo';
      resize: none;
      border: none;
      background: transparent;
      &:focus {
          outline: none;
      }
  }
  ::-webkit-scrollbar {
    width: 12px; 
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(0, 0%, 90%);
    border-radius: 20px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: hsl(0, 0%, 80%);
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;
