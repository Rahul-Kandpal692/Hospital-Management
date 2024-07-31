import  {User} from "../models/userSchema.js" 
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import {generateToken} from "../utils/jwtToken.js"
import {v2 as cloudinary} from "cloudinary"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const patientRegister =  catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,password,gender,dob,role}=req.body;
    if(!firstName||!lastName||!email||!phone||!nic||!password||!gender||!dob||!role){
        return next(new ErrorHandler("Please fill all fields",400))
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already registered with this email",400))
    }
    user = await User.create({firstName,lastName,email,phone,nic,password,gender,dob,role});
    generateToken(user,"User registered successfully",200,res)
    // res.status(200).json({
    //     success:true,
    //     message:"User registered successfully"
    // })
}) 

export const login =  catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email||!password||!confirmPassword||!role){
        return next(new ErrorHandler("Please fill all fields",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Please register first!",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }

    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",400));
    }

    generateToken(user,"User Logged In successfully",200,res)
})


export const addNewAdmin =  catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,password,gender,dob,role}=req.body;
    if(!firstName||!lastName||!email||!phone||!nic||!password||!gender||!dob){
        return next(new ErrorHandler("Please fill all fields",400))
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email alreaddy Registered`));
    }
    const admin = await User.create({firstName,lastName,email,phone,nic,password,gender,dob,role:"Admin"})
    res.status(200).json({
            success:true,
            message:"Admin registered successfully"
        })
})

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user=req.user;
    
    res.status(200).json({
        success:true,
        user
    })
})

export const adminLogout = catchAsyncErrors(async(req,res,next)=>{
    
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Admin logged out successfully!"
    })
})
export const patientLogout = catchAsyncErrors(async(req,res,next)=>{
    
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Patient logged out successfully!"
    })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});