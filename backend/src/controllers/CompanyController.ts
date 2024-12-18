import { Request, Response } from "express";
import { CompanyModel } from "../models/CompanyModel";
import { UserModel } from "../models/UserModel";

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { name, description, website, logo, location } = req.body;

    //@ts-ignore
    const userId = req.id;

    const findUser = await UserModel.findById(userId);

    if (findUser?.role !== "recruiter") {
      res.status(401).json("employee cannot register a company.");
      return;
    }

    const company = await CompanyModel.findOne({ name });

    if (company) {
      res.status(401).json("Company already register");
      return;
    }

    const register = await CompanyModel.create({
      name: name,
      description: description,
      website: website,
      logo: logo,
      location: location,
      UserId: userId,
    });

    res.status(201).json({
      message: "Company registered successfully",
      register,
    });
  } catch (error) {
    console.log("error in registerCompany", error);
    res.status(500).json("internal server error");
    return;
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;

    const companies = await CompanyModel.findById(userId);

    if (!companies) {
      res.status(404).json("No companies found");
      return;
    } else {
      res.status(200).json(companies);
      return;
    }
  } catch (error) {
    console.log("error in getCompany", error);
    res.status(500).json("internal server error");
  }
};
