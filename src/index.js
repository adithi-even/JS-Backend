


















//Basic aproach or the Forst approach

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";


// ( async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)        //so basically this line is : the url fromteh mongodb atlas and the / comes in the url and then the database name i.e., videotape and its variable name DB_NAME

//         app.on("error",((error) => {
//             console.log("error", error);
//             throw error            
            
//         }))

//         app.listen (process.env.PORT , ()=>{
//             console.log(`App is listening to the port ${process.env.PORT}`)
//         })


//     } catch (error) {
//         console.log("Error in index.js ",error);
//         throw error
//     }
// })()