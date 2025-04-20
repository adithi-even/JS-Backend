import mongoose from "mongoose";
import { DB_NAME } from  '../constants.js'

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST :a ${connectionInstance.connection.host}`);
        
                
    } catch (error) {
        console.log("MONGODB connection Failed ",error);
        process.exit(1)  //TODO : what is this ? In Node.js, process.exit(1) is used to terminate the process synchronously with an exit status of 1. This method instructs Node.js to exit immediately, even if there are still asynchronous operations pending, including I/O operations to process.stdout and process.stderr.
    }
}


export default connectDB;   