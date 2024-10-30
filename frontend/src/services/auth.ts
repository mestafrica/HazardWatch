import { AxiosResponse } from "axios";
import { apiClient } from "./config";

export const apiAdminLogin = async(payload: object): Promise<AxiosResponse> =>{
    
   return await apiClient.post("/endpoint", payload)
} 