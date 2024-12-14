import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, password, role, company } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) return res.json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      company: role === "recruiter" ? company : undefined,
    });

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
  } catch (error) {}
};
