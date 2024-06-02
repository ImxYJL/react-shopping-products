import useFetch from "../useFetch";
import { Product, getProducts } from "../../api/products";
import { SortOption } from "../../types/sortOption";
import { CATEGORY_OPTIONS, SORT_OPTIONS } from "../../constants/products";
import { FetchOptions } from "../useFetch";
import { useEffect, useState, useCallback } from "react";

interface UsePaginatedProductsReturn {
  products: Product[];
  isLoading: boolean;
  errorMessage: string;
  fetchNextPage: () => void;
  resetPage: () => void;
  setCategoryFilter: (category: string) => void;
  setPriceSort: (sort: SortOption) => void;
}

const INITIAL_PAGE_SIZE = 20;
const PAGE_SIZE = 4;

export default function usePaginatedProducts(): UsePaginatedProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const currentPage = page === 0 ? 0 : page + PAGE_SIZE;
  const currentPageSize = page === 0 ? INITIAL_PAGE_SIZE : PAGE_SIZE;

  const [categoryFilter, setCategoryFilter] = useState<string>(
    CATEGORY_OPTIONS.all
  );
  const [priceSort, setPriceSort] = useState<SortOption>(SORT_OPTIONS.asc);

  const fetchFunction = useCallback(
    (options?: FetchOptions) =>
      getProducts(
        currentPage,
        currentPageSize,
        options?.categoryFilter as string,
        options?.priceSort as SortOption
      ),
    [currentPage, currentPageSize]
  );

  const { data, errorMessage, isLoading, refetch } = useFetch(fetchFunction);

  useEffect(() => {
    fetchFunction({ categoryFilter, priceSort });
  }, [categoryFilter, page]);

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.data]);
      setIsLastPage(data.isLastPage);
    }
  }, [data]);

  const fetchNextPage = () => {
    if (!isLastPage && !isLoading && !errorMessage) {
      setPage((prevPage) => prevPage + 1);
      refetch({ categoryFilter, priceSort });
    }
  };

  const resetPage = () => {
    setProducts([]);
    setPage(0);
  };

  return {
    products,
    isLoading,
    errorMessage,
    fetchNextPage,
    resetPage,
    setCategoryFilter,
    setPriceSort,
  };
}
