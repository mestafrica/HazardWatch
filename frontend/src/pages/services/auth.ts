import { apiClient } from "./config";

export const apiLogin = async (payload: any) =>{

    try {
        const response = await apiClient.post("api/users/login", payload,  {
            headers: {
                "Content-Type": "application/json", // Ensure JSON format
            },
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            console.log("Server error details:", error.response.data); // Log error details from the server
            throw error.response; // Re-throw error for further handling
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
    
};


export const apiSignup = async (payload: any) => {
    try {
        const response = await apiClient.post("/api/users/register", payload, {
            headers: {
                "Content-Type": "application/json", // Ensure JSON format
            },
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            console.log("Server error details:", error.response.data); // Log error details from the server
            throw error.response; // Re-throw error for further handling
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};
