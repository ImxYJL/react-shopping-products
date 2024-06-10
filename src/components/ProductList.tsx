import { SortOption } from "../types/sortOption";
import {
  CATEGORY_SELECT_OPTIONS,
  PRICE_SORT_SELECT_OPTIONS,
  SORT_OPTIONS,
} from "../constants/products";
import { isIncludedInList } from "../utils/isIncludedInList";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useGetInfiniteProducts from "../hooks/useGetInfiniteProducts";
import ProductItem from "./ProductItem";
import Select from "./Select";
import ShopHeader from "./ShopHeader";
import styled, { keyframes } from "styled-components";
import useCartItems from "../hooks/useCartItems";

const ProductList = () => {
  const { cartItems } = useCartItems();

  const {
    products,
    isLoading,
    fetchNextPage,
    setCategoryFilter,
    setPriceSort,
  } = useGetInfiniteProducts();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isLoading) {
      setCategoryFilter(e.target.value);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      !isLoading &&
      isIncludedInList<SortOption>(value, Object.values(SORT_OPTIONS))
    ) {
      setPriceSort(value);
    }
  };

  const handleIntersection: IntersectionObserverCallback = (entry) => {
    if (entry[0].isIntersecting && !isLoading) {
      fetchNextPage();
    }
  };

  const { setTarget } =
    useIntersectionObserver<HTMLDivElement>(handleIntersection);

  return (
    <>
      <S.Container>
        <ShopHeader />
        <S.ShopBody>
          <S.Title>bpple 상품 목록</S.Title>
          <S.SelectContainer>
            <Select
              onChange={handleCategoryChange}
              options={CATEGORY_SELECT_OPTIONS}
            />
            <Select
              onChange={handleSortChange}
              options={PRICE_SORT_SELECT_OPTIONS}
            />
          </S.SelectContainer>
          <S.ItemContainer>
            {products.map(({ id, name, price, imageUrl }) => {
              const cartItem = cartItems.find((item) => item.product.id === id);
              const cartItemId = cartItem?.id;
              const quantity = cartItem?.quantity ?? 0;

              return (
                <ProductItem
                  key={crypto.randomUUID()}
                  id={id}
                  name={name}
                  price={price}
                  imageUrl={imageUrl}
                  cartItemId={cartItemId}
                  quantity={quantity}
                />
              );
            })}
            {isLoading && <S.Spinner />}
            <div ref={setTarget}></div>
          </S.ItemContainer>
        </S.ShopBody>
      </S.Container>
    </>
  );
};

export default ProductList;

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const S = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 12rem;
  `,

  ShopBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 0 2rem;
  `,

  Title: styled.h2`
    font-size: 2.4rem;
    font-weight: bold;
  `,
  SelectContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ItemContainer: styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1 0 100%;
    gap: 2rem 1.6rem;
    margin-top: 1.1rem;
  `,

  Spinner: styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 3px solid #d4d4d4;
    border-right: 3px solid #d4d4d4;
    border-bottom: 3px solid #d4d4d4;
    border-left: 6px solid black;
    background: transparent;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 auto;
  `,
};
