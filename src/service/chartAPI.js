import { request } from "../utils/request";

export const getData = (params) => {
  return request.get("/api/v3/price/history", { params });
};
