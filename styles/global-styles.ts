import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

${reset}

  html,
  body,
  input {
    overflow: hidden;
    font-family: "pretendard" ,Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  input, button {
    display: block;
  } 

`;

export default GlobalStyle;
