import styled from "styled-components";

interface FallbackProps {
  onClick: () => void;
}

const Fallback = ({ onClick }: FallbackProps) => {
  return (
    <S.Container>
      <S.Text>😥</S.Text>
      <S.Text>예상치 못한 에러가 발생했습니다.</S.Text>
      <S.Text>잠시 후 다시 시도해 주세요.</S.Text>
      <S.Button type="button" onClick={onClick}>
        다시 시도하기
      </S.Button>
    </S.Container>
  );
};

export default Fallback;

const S = {
  Container: styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Text: styled.p`
    font-size: 1.3rem;
    margin: 0.3rem;
  `,
  Button: styled.button`
    color: white;
    background-color: black;
    font-size: 1rem;
    margin-top: 1.8rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  `,
};
