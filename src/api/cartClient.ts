import { generateBasicToken } from "../utils/generateBasicToken";
import ApiClient from "./ApiClient";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_USERNAME;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD;

if (!BASE_URL || !USERNAME || !USER_PASSWORD) {
  throw new Error("VITE_BASE_URL, VITE_USERNAME, or VITE_USER_PASSWORD가 정의되지 않았습니다.");
}

export const cartClient = new ApiClient(BASE_URL, {
  Authorization: generateBasicToken(USERNAME, USER_PASSWORD),
  "Content-Type": "application/json",
});
