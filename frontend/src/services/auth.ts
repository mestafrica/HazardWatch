import { apiClient } from "./config";

export const apiLogin = async (payload: any) =>
  apiClient.post("api/users/login", payload);

export const apiSignup = async (payload: any) =>
  apiClient.post("/api/users/register", payload);

export const apiNewHazardReporter = async (payload: FormData) => {
  return await apiClient.post("/hazard-report/create", payload);
};



