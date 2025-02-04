import { Request, Response } from "express";
import { CompanyModel } from "../models/CompanyModel";
import { UserModel } from "../models/UserModel";
import { JobModel } from "../models/JobModel";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../utils/datauri";

export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { name, tagline, description, website, location } = req.body;

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

    let logo = (req.file as Express.Multer.File) ? req.file : null;

    let fileUri;

    if ((logo = req.file as Express.Multer.File)) {
      fileUri = getDataUri(logo);
    }

    let logoUrl;

    if (logo) {
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri?.content as string
      );
      logoUrl = cloudResponse.secure_url;
    }

    const register = await CompanyModel.create({
      name: name,
      tagline: tagline,
      description: description,
      website: website,
      logo: logoUrl,
      location: location,
      userId: userId,
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

    const companies = await CompanyModel.find({ userId: userId });

    if (!companies || companies?.length === 0) {
      res.status(404).json("No companies found");
      return;
    } else {
      res.status(200).json(companies);
      return;
    }
  } catch (error: any) {
    console.log("error in getCompany", error.message);
    res.status(500).json("internal server error");
  }
};

export const getCompanybyId = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;

    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(404).json("Company not found");
      return;
    }

    res.status(200).json(company);
  } catch (error: any) {
    console.log("error in getCompanybyId", error.message);
    res.status(500).json("internal server error");
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { name, description, website, location, tagline } = req.body;

    const companyId = req.params.id;
    //@ts-ignore
    const userId = req.id;

    const user = await UserModel.findById(userId);

    if (user?.role !== "recruiter") {
      res
        .status(403)
        .json("Employees are not allowed to update company details.");
      return;
    }

    let company = await CompanyModel.findById(companyId);

    if (company?.userId.toString() !== user._id.toString()) {
      res.status(403).json("Only company admin can update company details.");
      return;
    }

    let logo = (req.file as Express.Multer.File) ? req.file : null;

    let fileUri;

    if ((logo = req.file as Express.Multer.File)) {
      fileUri = getDataUri(logo);
    }

    let logoUrl;

    if (logo) {
      if (company.logo) {
        await cloudinary.uploader.destroy(company.logo);
      }
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri?.content as string
      );
      logoUrl = cloudResponse.secure_url;
      company.logo = logoUrl;
    }

    if (name) company.name = name;
    if (tagline) company.tagline = tagline;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    const updatedDetails = await company.save();

    if (!updatedDetails) {
      res.status(403).json("unable to update company details");
      return;
    }

    res.status(200).json(updatedDetails);
  } catch (error: any) {
    console.log("error in updateCompany", error.message);
    res.status(500).json("internal server error");
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await CompanyModel.find({ name: { $ne: "" } }).sort({
      name: 1,
    });

    if (!companies) {
      res.status(404).json("No companies found");
      return;
    }

    res.status(200).json(companies);
  } catch (error: any) {
    console.log("error in getAllCompanies", error.message);
    res.status(500).json("internal server error");
  }
};

export const getCompanyJobs = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;

    const company = await CompanyModel.findById(companyId);

    const jobs = await JobModel.find({ company });

    if (!jobs) {
      res.status(404).json({ message: "unable to find jobs" });
      return;
    } else {
      res.status(200).json(jobs);
      return;
    }
  } catch (error: any) {
    console.log("error in getAllCompanies", error.message);
    res.status(500).json("internal server error");
  }
};
