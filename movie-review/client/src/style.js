import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* Color */
    --color-main: #194e84;
    --color-border: #ddd;
    /* 4. 신규 리뷰 등록 / 리뷰 검색 input/ 리뷰 내역 영역 */
    --color-background: #f5f5f5;
    --color-white: #fff;
    --color-yellow: #fcf67b;

    /* font */
    --font-title: 18px;
    --font-regular: 14px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
  }

  /* 1. 영역별 제목 ( 신규 리뷰 등록 / 리뷰 검색 / 리뷰 내역 )  */
  /* 글자 크기 18px */
  /* 글자 색상 #194e84 */
  h2{
    font-size: 18px;
    margin-bottom: 1.2rem;
  }

  /* 2. 그 외 글자 */
  /* 글자 크기 14px */
  /* 글자 색상 #194e84 */
  h3,label,div {
    font-size: var(--font-regular);
    color: var(--color-main);
  }

  /* 3. 신규 리뷰 등록 영역의 input 및 select */
  /* 높이 40px */
  /* radius 5px */
  /* 테두리 색상 #ddd */
  input, select {
    width: 100%;
    height: 40px;
    font-size: var(--font-regular);
    border: 1px solid var(--color-border);
    border-radius: 5px;
    background-color: #fff;
    margin: 0.6rem 0;
    padding: 0.6rem;
    
  }

`;

export default GlobalStyle;
