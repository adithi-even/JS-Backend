import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

//so just by calling this below code with only the user's id (parameter) we can find the user and generate the access token and refreshToken and then save it to the database and return both the access token and refresh token 
const generateAcessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken() //the accesstoken we are gonna give it to the user 
        const refreshToken = user.generateRefreshToken()//but htis refresh token we are going to store it in the database so that we dont have to ask the password from the user everytime they tried to login

        user.refreshToken = refreshToken //here we are storing the refresh token in the database
        await user.save({ validateBeforeSave: false })

        //so once the refresh token is gets saved in the database then we are gonna return the accessToken and refreshToken 
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

export const registerUser = asyncHandler ( async (req, res) => {

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

export const loginUser = asyncHandler(async (req, res) => {
    //req body -> data
    //username/email or password fields required
    //find the username/email for logging in if present then 
    //check password if it is correct then generate
    //access and refresh token and send it to the user
    //send cookies
    
    
    
    //req body -> data
    const {email, username, password} = req.body;
    
    //find the username/email for logging in, if present then 
    if(!username || !email){
        throw new ApiError(400, "Enter username or email");
    }
    
    //checking here if the user exists either by username or email ?
    const user = await User.findOne({
        $or: [{username},{email}]
    })
    
    if(!user){
        throw new ApiError(404, "user is not registered")
    }
    
    //check password if it is correct, then generate
    const isPasswordValid = await user.isPasswordCorrect(password) 
    
    if(!isPasswordValid){
        throw new ApiError(401, "Password is not valid")
    }
    
    //access and refresh token and send it to the user
    const {accessToken, refreshToken} =  await generateAcessAndRefreshTokens(user._id)
    
    //ADDITIONAL STEP: when we have pulled the req.body we have received some unwanted fields so here in this below code we are filtering out those fields 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")//here we are not sending the ("-password -refreshToken") because of the security

    
    //send cookies
    //by this below method giving the "httpOnly" as true the cookies can only be modified through the backend you can see the cookies and cannot modified it through the frontend 
    const options = {
        httpOnly: true,
        secure: true
    } 

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User Logged in Successfully "
        )
    )

})


export const logoutUser = asyncHandler(async(req, res) =>{
    //remove cookies
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    } 

    return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,{}, "User Logged Out" 
        )
    )
    
})
