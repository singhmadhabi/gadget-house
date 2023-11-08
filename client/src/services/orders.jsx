import API from "../utils/api";
import { URLS } from "../constants";

export const create = (payload) => {
  return API.post(URLS.ORDERS, payload);
};