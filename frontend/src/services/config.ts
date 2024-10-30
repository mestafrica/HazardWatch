import axios, { AxiosInstance } from "axios";

export const baseUrl = import.meta.env.BASE_URL;



export const apiClient: AxiosInstance = axios.create({baseURL: baseUrl});