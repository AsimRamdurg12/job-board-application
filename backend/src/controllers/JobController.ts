import { Request, Response } from "express";
import { JobModel } from "../models/JobModel";
import { CompanyModel } from "../models/CompanyModel";
import { UserModel } from "../models/UserModel";

export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      title,
      tag,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    //@ts-ignore
    const userId = req.id;

    const company = await CompanyModel.findById(companyId);

    if (userId !== company?.userId.toString()) {
      console.log(userId, company?.userId);

      res
        .status(403)
        .json("Only company admin can create a job for the company");
      return;
    }

    const job = await (
      await JobModel.create({
        title,
        tag,
        description,
        requirements: requirements.split(","),
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        company: companyId,
        createdBy: userId,
      })
    ).populate({
      path: "company",
    });

    await CompanyModel.findByIdAndUpdate(
      companyId,
      { $push: { job: job._id } },
      { new: true }
    );

    if (!job) {
      res.status(403).json("Unable to create the job");
      return;
    } else {
      res.status(201).json(job);
      return;
    }
  } catch (error) {
    console.log("error in createJob", error);
    res.status(500).json("internal server error");
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";

    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
        { location: { $regex: location, $options: "i" } },
      ],
    };

    const jobs = await JobModel.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      res.status(404).json("no jobs found");
      return;
    } else {
      res.status(200).json(jobs);
      return;
    }
  } catch (error) {
    console.log("error in getAllJobs", error);
    res.status(500).json("internal server error");
  }
};

export const getMyJobs = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;
    const user = await UserModel.findById(userId);

    const myJobs = await JobModel.find({ createdBy: user?._id }).populate({
      path: "company",
    });

    if (!myJobs) {
      res.status(404).json("no jobs found");
      return;
    } else {
      res.status(200).json(myJobs);
      return;
    }
  } catch (error) {
    console.log("error in getMyJobs", error);
    res.status(500).json("internal server error");
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const job = await JobModel.findById(jobId)
      .populate({
        path: "company",
      })
      .populate({
        path: "applications",
      });

    if (!job) {
      res.status(404).json("no job found");
      return;
    } else {
      res.status(200).json(job);
      return;
    }
  } catch (error: any) {
    console.log("error in getJobById", error.message);
    res.status(500).json("internal server error");
  }
};
