import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { ConnectDB } from "./db/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import Authroutes from "./routes/AuthRoutes";
import Companyroutes from "./routes/CompanyRoutes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Asim");
});

app.use("/api/auth", Authroutes);
app.use("/api/company", Companyroutes);

app.listen(PORT, async () => {
  console.log(`Running on http://localhost:${PORT}`);
  ConnectDB();
});
