import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const registerUser = asyncHandler ( async (req,res) => {

    //STEPS TO REGISTER THE USER
    // get user details from frontend 
    // validation (not empty, required fields and/or email format)
    // check if user already exists : username or email     
    // check for images , check for avatar
    // upload them (images and avatar) to cloudinary, avatar
    //create user object - create entry in db  (.create)
    //remove password and refresh token field from response
    //check for user creation (null or response)
    //return res
    
    // get user details from frontend 
    const {fullName, email, username, password} = req.body;
    
    console.log("email" , email);
    console.log("password" , password);
    
    // validation (not empty, required fields and/or email format)
    if(
        [fullName, email, username, password].some((field)=>field?.trim() === "") //we are adding this code to find out if any 4  of the fields are empty if it is then it is gonna return true
    ){
        throw new ApiError(
            400,"All fields are required" 
        );
    }
    
    // check if user already exists : username or email     
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if(existedUser){
        throw new ApiError(409,"User with email or username already exixts")
    }

    console.log(req.files);
    
    
    // check for images , check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    
    // upload them (images and avatar) to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
        
    }
    
    //create user object - create entry in db  (.create)
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //check for user creation (null or response)
    if(!createdUser){
        throw new ApiError(500,"Something went worong while registering the user")
    }

    //return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
    
    
})


