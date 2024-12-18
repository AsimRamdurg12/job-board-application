import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const Protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json("Unauthorized: No token provided") as unknown as void;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded || typeof decoded !== "object") {
      return res
        .status(401)
        .json("Unauthorized: Invalid token") as unknown as void;
    }
    //@ts-ignore
    req.id = decoded.id;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
