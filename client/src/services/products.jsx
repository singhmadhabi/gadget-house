import API from "../utils/api";
import { URLS } from "../constants";

export const list = (limit, page) => {
  return API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`);
};

export const getById = (id) => {
  return API.get(URLS.PRODUCTS + `/${id}`);
};