import axios, { AxiosInstance } from "axios";
export type ApiClient = AxiosInstance;
export const apiClient: ApiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
