import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express()

app.use(cors({  //TODO:WHAT IS CORS
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"})) //urlencoded is used to parse the incoming request with urlencoded payload
app.use(express.static("public"))  //public is the folder name where the images are stored
app.use(express.cookieParser())  //cookie parser is used to parse the incoming request with cookies

//routes import

import userRouter from './Routes/user.routes.js';


//routes declaration

app.use("api/v1/users", userRouter)



export { app } 


/*
app.get('/order-pizza', (req, res) => {
    // 'req' is you asking for a pizza
    console.log(req.query); // You might say: { size: 'large', toppings: 'extra cheese' }
  
    // 'res' is the shop giving you a pizza
    res.send('Here’s your large pizza with extra cheese!');
  });
*/  