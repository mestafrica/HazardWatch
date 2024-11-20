import { AxiosResponse } from "axios";
import { apiClient } from "./config";

export const apiPostHazzardReport = async (
  payload: object
): Promise<AxiosResponse> => apiClient(`/hazard-report/create`, payload);
