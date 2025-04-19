import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()

app.use(cors({  //TODO:WHAT IS CORS ? 
  //Calling use(cors()) will enable the express server to respond to preflight requests. A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//these all the below are different types methods in which we are getting the data into the backend
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"})) //urlencoded is used to parse the incoming request with urlencoded payload i.e., when the data is sent through the url to the backend we have to pre-inform to the express that there will be data which ia also coming from the url so to handle that we use this urlencoded
app.use(express.static("public"))  //public is the folder name where the images are stored in the server
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