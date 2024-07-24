import express from "express";
import mongoose from "mongoose";


// Create Express App
const app = express();


// Apply middlewares
app.use(express.json());



// Use routes



// Connect to the database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');


// Listen for incoming requests
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});