import styled from "styled-components";
import { ReactComponent as AddToCartIcon } from "../assets/addToCart.svg";
import { ReactComponent as DeleteFromCartIcon } from "../assets/deleteFromCart.svg";
import useAddCartItem from "../hooks/useAddCartItem";
import QuantitySetter from "./QuantitySetter";
interface ProductItemProps {
  cartItemId?: number;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const ProductItem = ({
  id,
  name,
  price,
  imageUrl,
  cartItemId,
  quantity,
}: ProductItemProps) => {
  const addMutation = useAddCartItem();

  const handleAddToCart = () => {
    addMutation.mutate({ productId: id, quantity: 1 });
  };

  return (
    <S.Container>
      <S.ProductImage src={imageUrl}></S.ProductImage>
      <S.ProductInfo>
        <S.ProductName>{name}</S.ProductName>
        <S.ProductPrice>{price.toLocaleString()}원</S.ProductPrice>
      </S.ProductInfo>
      <S.ButtonWrapper>
        {cartItemId && quantity > 0 ? (
          <QuantitySetter cartItemId={cartItemId ?? 0} quantity={quantity} />
        ) : (
          <S.AddToCartIcon
            role="button"
            aria-label="상품 담기"
            onClick={handleAddToCart}
          />
        )}
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default ProductItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 48%;
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 1.2rem 1.2rem 0 0;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1.5rem 0.8rem;
  `,

  ProductName: styled.h3`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  `,

  ProductPrice: styled.p`
    font-size: 1.2rem;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    right: 0;
  `,

  AddToCartIcon: styled(AddToCartIcon)`
    cursor: pointer;
  `,

  DeleteFromCartIcon: styled(DeleteFromCartIcon)`
    cursor: pointer;
  `,
};
