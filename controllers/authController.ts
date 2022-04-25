import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/CatchAsync";
import jwt from 'jsonwebtoken';
import User from "../models/userModel";

const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Get token
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  };

  if(!token){
    return next(new AppError('You are not logged in. Please log in to get access', 401))
  }

  // Validate Token
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);
  
  // Check if user still exists
  const currentUser = await User.findById((<any>decoded).id);
  if(!currentUser){
    return next(new AppError('This user does no longer exists.', 401))
  }

  // Check if password recently changed (For next version of app)

  // Allow access to protect route
  req['user'] = currentUser;
  
  next();
})

export {
  protect
}