import mongoose from "mongoose";



const { MONGO_URL } = process.env;

//check if empty and throw an error
if (!MONGO_URL)
    throw new Error("Invalid env variable: MONGO_URL");


//create async arrow function
export const connectToMongoDB = async () => {
    try {
        //check if mongoose state is not 0 //0 means disconnected .if not it returns the mongoose.connection
        if (mongoose.connect.readyState !== 0)
            return mongoose.connection
    }

   await mongoose.connect(MONGO_URL);
   return mongoose.connection;
} catch (error) {
    return Promise.reject(error)
};
