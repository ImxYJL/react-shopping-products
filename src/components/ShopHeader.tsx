import styled from "styled-components";
import { SCREEN_WIDTH_REM } from "../styles/GlobalStyle";
import { ReactComponent as CartIcon } from "../assets/cart.svg";
import { useContext } from "react";
import CartItemsContext from "../store/cartItems";

const ShopHeader = () => {
  const { cartItems, isLoading } = useContext(CartItemsContext);

  return (
    <S.Header>
      <S.Title>SHOP</S.Title>
      <S.CartButton role="button" aria-label="장바구니 이동">
        <CartIcon />
        <S.Badge>
          <S.CircleContent>{isLoading || cartItems.length}</S.CircleContent>
        </S.Badge>
      </S.CartButton>
    </S.Header>
  );
};

export default ShopHeader;

const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 6.4rem;
    padding: 2.4rem;
    background-color: #000000;
    position: fixed;
    top: 0;
    max-width: ${`${SCREEN_WIDTH_REM}rem`};
  `,

  Title: styled.h1`
    width: fit-content;
    font-size: 2rem;
    font-weight: 800;
    color: #ffffff;
  `,

  CartButton: styled.div`
    position: relative;
    cursor: pointer;
  `,

  Badge: styled.div`
    cursor: pointer;
    display: inline-table;
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
    background-color: white;
    font-weight: 700;
    border-radius: 50%;
    position: absolute;
    right: -0.8rem;
    bottom: -0.6rem;
  `,

  CircleContent: styled.div`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  `,

  CircleBadge: styled.div`
    background-color: white;
    position: absolute;
    z-index: 1;
    right: -0.4rem;
    bottom: -0.4rem;
    padding: 0.4rem;
    border-radius: 100%;
    width: 1.7rem;
    height: 1.7rem;
    text-align: center;
    font-weight: bold;
  `,
};
