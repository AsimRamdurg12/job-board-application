import mongoose, { model, Schema, Types } from "mongoose";

export interface company {
  name: string;
  tagline: string;
  description: string;
  website: string;
  logo: string;
  location: string;
  job: Types.ObjectId[];
  userId: Types.ObjectId;
}

const CompanySchema: Schema<company> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String },
    location: { type: String },
    job: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CompanyModel = model("Company", CompanySchema);
