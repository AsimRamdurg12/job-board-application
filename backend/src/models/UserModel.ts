import mongoose, { model, Schema, Types } from "mongoose";

export interface user {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "employee" | "recruiter";
  profile: {
    bio: string;
    skills: string[];
    resume: string;
    company: Types.ObjectId;
    profilePhoto: string;
  };
}

const UserSchema: Schema<user> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["employee", "recruiter"], required: true },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
