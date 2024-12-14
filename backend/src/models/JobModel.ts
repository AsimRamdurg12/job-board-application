import mongoose, { model, Schema, Types } from "mongoose";

interface job {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: string;
  location: string;
  jobType: string;
  company: Types.ObjectId;
  createdBy: Types.ObjectId;
  applications: Types.ObjectId[];
}

const JobSchema: Schema<job> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
    salary: { type: Number, required: true },
    experienceLevel: { type: String, required: true },
    location: { type: String },
    jobType: { type: String },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Applications" },
    ],
  },
  { timestamps: true }
);

export const JobModel = model("Job", JobSchema);
