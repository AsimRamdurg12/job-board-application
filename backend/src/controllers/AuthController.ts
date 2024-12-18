import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const requiredBody = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      mobile: z.number().min(10, "mobile number must be of 10 digits"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
      role: z.enum(["recruiter", "employee"]),
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
      res.status(403).json("Invalid Credentials Format");
    }

    const { name, email, mobile, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) res.json("user already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.log("error in signup", error.message);
    res.status(500).json("internal server error");
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      res.status(404).json("User not Found");
      return;
    }

    if (role !== existingUser?.role) {
      res.status(401).json("Role does not match");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser?.password || ""
    );

    if (!passwordMatch) {
      res.status(401).json("Invalid Password");
    } else {
      const token = jwt.sign(
        {
          id: existingUser?._id,
        },
        process.env.JWT_SECRET as string
      );

      res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      res.status(200).json({
        token,
        existingUser,
      });
    }
  } catch (error: any) {
    console.log("error in login", error.message);
    res.status(500).json("internal server error");
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logged Out Successfully");
    return;
  } catch (error: any) {
    console.log("error in logout", error.message);
    res.status(500).json("internal server error");
    return;
  }
};
