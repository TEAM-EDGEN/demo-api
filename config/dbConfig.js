import mongoose from "mongoose";
import "dotenv/config";


// Fetch Connection String from .env 
const connectionString = process.env.MONGO_URL;

export const dbConnection = ()  => {
    mongoose.connect(connectionString).then(() => {
        console.log('DB IS CONNECTED SUCCESSFULLY');
    })
    .catch((err) => {
        console.error('DB connection error', err.message);
    });
};