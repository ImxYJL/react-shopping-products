import { useEffect, useState } from "react";
import { SortOption } from "../types/sortOption";

export interface FetchOptions {
  categoryFilter: string;
  priceSort: SortOption;
}

const useFetch = <T>(fetchFunction: (options?: FetchOptions) => Promise<T>) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetch = async (options?: FetchOptions) => {
    try {
      setIsLoading(true);
      const result = await fetchFunction(options);
      setData(result);
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          "데이터를 불러오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      } else {
        setErrorMessage(
          "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, isLoading, errorMessage, refetch: fetch };
};

export default useFetch;
