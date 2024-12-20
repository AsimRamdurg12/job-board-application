import mongoose, { model, Schema, Types } from "mongoose";

export interface company {
  name: string;
  description: string;
  website: string;
  logo: string;
  location: string;
  userId: Types.ObjectId;
}

const CompanySchema: Schema<company> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String },
    location: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CompanyModel = model("Company", CompanySchema);
