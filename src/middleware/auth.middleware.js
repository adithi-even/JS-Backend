import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from '../models/user.model.js'

export const verifyJWT = asyncHandler(async(req, res, next)=>{ //here if the res is not used then we can just use the undderscore " _ " in the place of the above res like this async(req, _ , next) instead of this async(req, res, next)
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","") //TODO: ASK GPT
  
    if(!token) {
      throw new ApiError(401, "Unauthorized request")
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) //if the  token is present then we are going to check if the token is correct or not //here 1st parameter is the token in the 10th line and the next parameter is the secret which is gonna verify that is this token belongs to us ? if the verification is true then we can store it in decodedToken 
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
    if(!user){
      //TODO discuss about frontEnd
      throw new ApiError(401, "Invalid Access Token")
    }
  
    req.user = user;
    next()
    
  } catch (error) {
    throw new ApiError(401, error?.messgae || "Invaid Access TOken")
  }

})