import { apiClient } from "./config";

export const apiLogin = async (payload: any) => apiClient.post("api/users/login", payload);

export const apiSignup = async (payload: any) => apiClient.post("/api/users/register", payload)
