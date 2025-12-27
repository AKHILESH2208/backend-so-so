import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./database.js";
import app from "./app.js"

dotenv.config({
    path: './.env'
});

// Disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const startServer = async()=>{
    try {
        await connectDB();
    } catch (error) {
        console.log("MongoDB connection failed!!!", error.message);
        console.log("Starting server without database...");
    }

    app.on("error", (error)=>{
        console.log("Error",error);
        throw error;
    });
    
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
}

startServer();