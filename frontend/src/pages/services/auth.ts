import { apiClient } from "./config";

export const apiLogin = async (payload: any) =>{
    return await apiClient.post("/users/login", payload );
};

export const apiSignup = async (payload: any) => {
    return await apiClient.post("/users/register", payload);
}