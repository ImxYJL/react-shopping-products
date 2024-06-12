import styled from "styled-components";
import QuantitySetter from "../QuantitySetter";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";

interface CartItemProps {
  cartItemId: number;
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

const CartItem = ({
  cartItemId,
  imageUrl,
  productName,
  price,
  quantity,
}: CartItemProps) => {
  const deleteMutation = useDeleteCartItem();

  const clickDeleteCartItemHandler = () => {
    deleteMutation.mutate(cartItemId);
  };

  return (
    <S.Container>
      <S.ItemImg src={imageUrl} />
      <S.DescriptionContainer>
        <S.ItemName>{productName}</S.ItemName>
        <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
        <QuantitySetter
          cartItemId={cartItemId}
          quantity={quantity}
        ></QuantitySetter>
      </S.DescriptionContainer>
      <S.DeleteButton onClick={clickDeleteCartItemHandler}>삭제</S.DeleteButton>
    </S.Container>
  );
};

export default CartItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
    margin-bottom: 0.7rem;
  `,
  ItemImg: styled.img`
    flex: 3;
    width: 25%;
    height: 10rem;
    border-radius: 0.8rem;
  `,
  DescriptionContainer: styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
    margin-bottom: 0;
  `,
  ItemName: styled.h4`
    font-size: 1.6rem;
    font-weight: bold;
  `,
  ItemPrice: styled.p`
    font-size: 1.2rem;
    margin-bottom: 0.1rem;
  `,
  DeleteButton: styled.button`
    flex: 1;
    height: 25%;
    margin-right: 1.7rem;
    padding: 0.3rem 0.5rem;
    white-space: nowrap;
    color: #0a0d13;
    font-size: 1.2rem;
    border: 0.1rem solid #bebebe;
    border-radius: 0.4rem;
    background-color: #ffffff;
    cursor: pointer;
  `,
};
