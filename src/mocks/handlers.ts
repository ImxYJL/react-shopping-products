import { http, HttpResponse } from "msw";
import { BASE_URL } from "../api/cartClient";
import { API_URL } from "../constants/url";
import products from "./products.json";
import { SORT_OPTIONS } from "../constants/products";
import cartItems from "./cartItems.json";

const createUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

const createResponse = async (handler, req) => {
  const data = await handler(req);
  return HttpResponse.json(data.response, { status: data.status });
};

export const handlers = [
  http.post(createUrl(API_URL.cartItems), (req) =>
    createResponse(async () => {
      return { status: 201 };
    }, req)
  ),

  http.delete(createUrl(API_URL.cartItems) + "/:cartItemId", (req) =>
    createResponse(async () => {
      return { response: {}, status: 201 };
    }, req)
  ),

  http.patch(createUrl(API_URL.cartItems) + "/:cartItemId", (req) =>
    createResponse(async () => {
      return { response: {}, status: 201 };
    }, req)
  ),

  // NOTE: get cartItems
  http.get(createUrl(API_URL.cartItems), (req) =>
    createResponse(async () => {
      const defaultCartItems = cartItems;
      return { response: defaultCartItems, status: 201 };
    }, req)
  ),

  // NOTE: get products
  http.get(createUrl(API_URL.products), (req) =>
    createResponse(async ({ request }) => {
      const url = new URL(request.url);

      const page = Number(url.searchParams.get("page") || "0");
      const size = Number(url.searchParams.get("size") || "20");
      const category = url.searchParams.get("category");
      const sort = url.searchParams.get("sort")?.split(",");

      const start = page * size;
      const end = start + size;

      const paginatedProducts = products.slice(start, end);
      const filteredProducts = paginatedProducts.map((product) => ({
        ...product,
        category,
      }));

      const [sortKey, sortValue] = sort || [null, null];
      const isPriceSort = sortKey === "price";
      const sortedProducts = filteredProducts.sort((a, b) => {
        if (!isPriceSort) {
          return 0;
        }

        if (typeof sortValue === "string" && sortValue === SORT_OPTIONS.asc) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      return {
        response: { content: sortedProducts, lastPage: end >= products.length },
        status: 201,
      };
    }, req)
  ),
];
