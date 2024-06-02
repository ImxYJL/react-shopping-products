import { SORT_OPTIONS } from "../constants/products";

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
