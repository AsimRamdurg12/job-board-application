import mongoose, { model, Schema, Types } from "mongoose";

interface applications {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const ApplicationSchema: Schema<applications> = new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const ApplicationsModel = model("Applications", ApplicationSchema);
