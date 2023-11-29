import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

 const registerUser = asyncHandler( async (req, res) => 
{
    
  // check the status and postman given the message
  // res.status(200).json({
  //   message: "404 not found",
  // });

  // Get user details from fontend 
  const {fullName, email , password, username} = req.body
  // console.log("email: " , email)
  

  // First option use to check the user fields ->
  
  // if (fullName === "") {
  //   throw new ApiError(400 , "fullname is required")
  // }

  // second option use to check the user fields ->

  // check validation not empty :-)
  if (
    [fullName, email, password, username].some((fields) => fields?.trim() === "") 
  ) {
    throw new ApiError(400 , "All fields are required and complsory")
  }

 // check if user already exist or not : username and email :-)
  const userExist = await User.findOne({
    $or: [ { email } , { username } ]
  })

  if( 
      userExist
    ) {
         throw new ApiError(408 , "User already exists")
      }

 // check the image for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;  // avatar[0] this is first property of avatar
//   const coverImageLocalPath = req.files?.coverImage[0]?.path
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}

  if (!avatarLocalPath) {
    throw new ApiError(400 , "Avatar Image is required")
  }

  // upload to cloudinary : avater
  const avatarResponse = await uploadOnCloudinary(avatarLocalPath)
  const coverImageResponse = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatarResponse){
    throw new ApiError(400 , "Avatar is required")
  }

  //create user object and create entry to db :-)

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatarResponse.url,
    coverImage: coverImageResponse?.url || ""
  })

  // remove password and refeshtoken feild :-)
  const createUser = await User.findById(user._id).select("-password -refreshToken")
  
  if (!createUser) {
    throw new ApiError(500 , "Something went wrong registering user")
  }

  // return data to postman :-)

  return res.status(201).json(
    new ApiResponse(200 , createUser , "user registered successfully")
  )
  })

export {
    registerUser,
}