import { Request, Response } from "express";
import { ApplicationsModel } from "../models/ApplicationModel";
import { JobModel } from "../models/JobModel";

export const applyJobs = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;

    const jobId = req.params.id;

    const existingApplication = await ApplicationsModel.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      res.status(409).json("You have already applied for this job.");
      return;
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      res.status(404).json("No job found");
      return;
    }

    if (job.createdBy.toString() === userId) {
      res.status(403).json({ message: "you cannot apply to this job" });
      return;
    }

    const application = await ApplicationsModel.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(application?._id);
    await job.save();

    res.status(200).json({ message: "Applied successfully", job });
  } catch (error: any) {
    console.log("error in applyJobs", error.message);
    res.status(500).json("internal server error");
  }
};

export const getAppliedJobs = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.id;

    const appliedJobs = await ApplicationsModel.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (!appliedJobs) {
      res.status(404).json("No applications found");
      return;
    } else {
      res.status(200).json(appliedJobs);
    }
  } catch (error: any) {
    console.log("error in getAppliedJobs", error.message);
    res.status(500).json("internal server error");
  }
};

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const applicants = await JobModel.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
      },
    });

    if (!applicants) {
      res.status(404).json("Job not found");
      return;
    } else {
      res.status(200).json(applicants);
    }
  } catch (error: any) {
    console.log("error in getApplicants", error.message);
    res.status(500).json("internal server error");
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;

    const { status } = req.body;

    if (!status) {
      res.status(403).json("Please update the status");
      return;
    }

    const application = await ApplicationsModel.findOneAndUpdate(
      { _id: applicationId },
      { status: status.toLowerCase() },
      { new: true }
    );

    if (!application) {
      res.status(404).json("Cannot update the status");
      return;
    } else {
      res.status(200).json({ application });
    }
  } catch (error: any) {
    console.log("error in updateStatus", error.message);
    res.status(500).json("internal server error");
  }
};
