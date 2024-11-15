import { AxiosResponse } from "axios";
import { apiClient } from "./config";




export const apiAdminLogin = async(payload: object): Promise<AxiosResponse> =>{
    
   try {
         return await apiClient.post("/users/login", payload);

   } catch (error) {
      throw new Error(`Login failed: ${error}`);
      
   }
} 