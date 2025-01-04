import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { ConnectDB } from "./db/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import AuthRoutes from "./routes/AuthRoutes";
import CompanyRoutes from "./routes/CompanyRoutes";
import JobRoutes from "./routes/JobRoutes";
import ApplicationRoutes from "./routes/ApplicationRoutes";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: ["https://job-board-application-p3ua.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Asim");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/company", CompanyRoutes);
app.use("/api/job", JobRoutes);
app.use("/api/apply", ApplicationRoutes);

app.listen(PORT, async () => {
  console.log(`Running on http://localhost:${PORT}`);
  ConnectDB();
});
