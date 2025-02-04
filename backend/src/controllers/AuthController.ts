import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../utils/datauri";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const requiredBody = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      mobile: z.string().min(10, "mobile number must be of 10 digits"),
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
    const existingMobile = await UserModel.findOne({ mobile });

    if (existingUser) {
      res.status(409).json({ message: "user already exists" });
      return;
    }
    if (existingMobile) {
      res.status(403).json({ message: "Mobile already exists" });
      return;
    }

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
    res.status(500).json({ message: "internal server error" });
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
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser?.password || ""
    );

    if (!passwordMatch) {
      res.status(401).json("Invalid Password");
      return;
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
        sameSite: "none",
        secure: true,
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
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true, // Should match how the cookie was set
      sameSite: "none", // Required for cross-origin cookies
    });
    res.status(200).json("Logged Out Successfully");
    return;
  } catch (error: any) {
    console.log("error in logout", error.message);
    res.status(500).json("internal server error");
    return;
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;

    let { name, email, mobile, currentPassword, newPassword, bio, skills } =
      req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(403).json("User not found");
      return;
    }

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      res
        .status(400)
        .json("Please provide both current password and new password");
      return;
    }

    if (currentPassword && newPassword) {
      if (!user?.password) {
        res.status(400).json("User does not have a password set");
        return;
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        res.status(403).json("Password doesn't match");
        return;
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      if (user.password === hashed) {
        res
          .status(401)
          .json("Current Password and new Password must be different");
        return;
      }

      user.password = hashed;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const resume = files.resume ? files.resume[0] : null;
    const profilePhoto = files.profilePhoto ? files.profilePhoto[0] : null;

    if (profilePhoto) {
      if (user.profile?.profilePhoto) {
        await cloudinary.uploader.destroy(user.profile.profilePhoto);
      }
      const profileUri = getDataUri(profilePhoto);
      const cloudResponse = await cloudinary.uploader.upload(
        profileUri.content as string
      );
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    if (resume) {
      if (user.profile?.resume) {
        await cloudinary.uploader.destroy(user.profile.resume);
      }
      const fileUri = getDataUri(resume);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content as string
      );
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = resume.originalname;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = typeof skills === "string" ? skills.split(",") : [];
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json(updatedUser);
      return;
    }
  } catch (error: any) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json("Internal server error");
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json("User not found");
      return;
    } else {
      res.status(200).json(user);
    }
  } catch (error: any) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json("Internal server error");
  }
};
