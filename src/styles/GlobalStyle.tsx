import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle` 
  ${reset}

  *{
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }
  `;

export const SCREEN_WIDTH_REM = 44;

export const GlobalLayout = styled.div`
  max-width: ${SCREEN_WIDTH_REM}rem;
  height: 100vh;
  margin: 0 auto;
`;
