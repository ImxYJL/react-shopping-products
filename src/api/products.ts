import { API_URL } from "../constants/url";
import { cartClient } from "./cartClient";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductResponse {
  content: Product[];
  last: boolean;
}

export const getProducts = async (
  page: number,
  size: number,
  categoryFilter: string,
  sort: "asc" | "desc"
) => {
  const categoryParam =
    categoryFilter === "all" ? [] : ["category", categoryFilter];

  const params = [
    ["page", page.toString()],
    ["size", size.toString()],
    ["sort", ["price", sort].join(",")],
    categoryParam,
  ].filter((param) => param.length === 2);

  const data = await cartClient.get<ProductResponse>(
    API_URL.products,
    new URLSearchParams(params)
  );

  const isLastPage = data.last;

  return { data: data.content, isLastPage };
};
