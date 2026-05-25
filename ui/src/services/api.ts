import { AxiosResponse } from "axios";
import { apiClient } from "./config";
import { HazardReport } from "../types/hazardreport";

// POST new hazard report
export const apiNewHazardReporter = async (payload: FormData) => {
  return await apiClient.post("/hazard/create", payload);
};

// GET all hazard reports
export const apiGetAllHazardReports = async (): Promise<AxiosResponse<HazardReport[]>> => {
  return apiClient.get<HazardReport[]>("/hazard/getall");
};

// GET trending hazard reports
//export const apiGetTrendingHazardReports = async (): Promise<AxiosResponse<HazardReport[]>> => {
//return apiClient.get<HazardReport[]>("/hazard-report/getall?sortBy=upvotes&order=desc");
//};

export const apiGetAllAnnouncements = async () => {
  return apiClient.get("/announcement/getall");
};

export const apiGetAirQuality = async (lat: number, lon: number) => {
  return apiClient.get(`/air-quality?lat=${lat}&lon=${lon}`);
};

// GET hazard report by ID
export const apiGetHazardReportById = async (id: number): Promise<AxiosResponse<HazardReport>> => {
  return apiClient.get<HazardReport>(`/hazard/${id}`);
};

// Get the shareable frontend URL for a hazard report
export const getHazardReportUrl = (id: string) => `${window.location.origin}/hazard/${id}`;

// PATCH upvote hazard report by ID
export const apiUpvoteHazard = async (id: string) => {
  return apiClient.patch(`/hazard/upvote/${id}`);
};

export const apiUpdateHazardReport = async (
  hazardId: string,
  payload: { title: string; description: string }
) => {
  return apiClient.patch(`/hazard/update/${hazardId}`, payload);
};