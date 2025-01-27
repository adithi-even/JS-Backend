  // require("dotenv").config({ path: "./env"});
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , )


    //this code is added by me from
    app.on("error",((error) => { 
        console.log("error", error);
        throw error            
        
    }))
    //this code is added by me till here

})
.catch((err)=>{
    console.log("Mongo db connection failde !!" , err);
    
})















/*

Basic aproach or the Forst approach

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import app from "./app";

const app = express();



( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)        //so basically this line is : the url fromteh mongodb atlas and the / comes in the url and then the database name i.e., videotape and its variable name DB_NAME

        app.on("error",((error) => {
            console.log("error", error);
            throw error            
            
        }))

        app.listen (process.env.PORT , ()=>{
            console.log(`App is listening to the port ${process.env.PORT}`)
        })


    } catch (error) {
        console.log("Error in index.js ",error);
        throw error
    }
})()

*/