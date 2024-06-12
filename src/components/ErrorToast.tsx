import styled from "styled-components";
import { SCREEN_WIDTH_REM } from "../styles/GlobalStyle";
import { useToast } from "../stores/ToastProvider";

const ErrorToast = () => {
  const { message: errorMessage } = useToast();

  return (
    <S.Container>
      <S.Toast>{errorMessage}</S.Toast>
    </S.Container>
  );
};

export default ErrorToast;

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Toast: styled.section`
    position: fixed;
    top: 0;
    height: 4rem;
    width: ${`${SCREEN_WIDTH_REM}rem`};
    margin-top: 6.4rem;
    font-size: 1.2rem;
    background: #0a0d13;
    background-color: #ffc9c9;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
