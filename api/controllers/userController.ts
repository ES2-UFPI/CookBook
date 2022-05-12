import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/CatchAsync";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";

const signToken = (id: String) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // Checks email & password
    if (!email || !password) {
      next(new AppError("Please provide email and password", 400));
    }

    // Checks if User exist && password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      next(new AppError("Email or password incorrect", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      _id: user._id,
      name: user.name,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const user = await User.find()
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: "success",
      results: user.length,
      data: user,
    });
  }
);

const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id).select("-__v");

    if (!User) {
      return next(new AppError("Can't find user with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(user._id);

    return res.status(201).json({
      stauts: "success",
      token,
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError("Can't find user with that id", 404));
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("Can't find user with that id", 404));
    }

    return res.status(204).json({
      status: "success",
    });
  }
);

const getUsersByName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;

    const users = await User.find({
      name: /^bar$/i.test(name) ? name : new RegExp(name, "i"),
    })
      .select("-__v");

    if (!users) {
      return next(new AppError("Can't find user with that name", 404));
    }

    return res.status(200).json({
      status: "success",
      data: users,
    });
  }
);

export {
  login,
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  getUsersByName,
};
