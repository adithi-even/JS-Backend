import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler ( async (req,res) => {
    res.status(201).json({message: "User Registration successful !"})
})