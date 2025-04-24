import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = asyncHandler(async(req, res, next)=>{
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

  if(!token) {
    throw new ApiError(401, "Unauthorized request")
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) //if the  token is present then we are going to check if the token is correct or not 

  await User.find

})