import openeye from "../assets/openeye.svg";
import closeeye from "../assets/closeeye.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useProfile from "../hooks/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/util";

interface UpdateProps {
  name?: string;
  email?: string;
  mobile?: string;
  bio?: string;
  skills?: string;
  currentPassword?: string;
  newPassword?: string;
  resume?: File;
  resumeOriginalName?: string;
  profilePhoto: File;
}

const UpdateProfile: React.FC = () => {
  const { authUser } = useProfile();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const { register, handleSubmit } = useForm<UpdateProps>({
    defaultValues: {
      name: authUser.name,
      email: authUser.email,
      mobile: authUser.mobile,
      bio: authUser.profile.bio,
      skills: authUser.profile.skills?.join(","),
      currentPassword: "",
      newPassword: "",
      resume: undefined,
      resumeOriginalName: authUser.profile.resumeOriginalName || "",
      profilePhoto: undefined,
    },
  });

  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (updatedData: UpdateProps) => {
      // Create FormData and append all fields
      const formData = new FormData();
      formData.append("name", updatedData.name || "");
      formData.append("email", updatedData.email || "");
      formData.append("mobile", updatedData.mobile || "");
      formData.append("bio", updatedData.bio || "");
      formData.append("skills", updatedData.skills || "");
      formData.append("currentPassword", updatedData.currentPassword || "");
      formData.append("newPassword", updatedData.newPassword || "");
      // Append file if present
      if (resumeFile) {
        formData.append("resume", resumeFile);
        formData.append("resumeOriginalName", resumeFile?.name);
      }
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const res = await axios.post(`${BACKEND_URL}/api/auth/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error("Profile update failed. Please try again.");
      console.error("Error during update:", error);
    },
  });

  const handleUpdate = (updatedData: UpdateProps) => {
    update(updatedData);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col max-w-xl md:max-w-3xl mx-auto max-sm:mx-4 my-4 justify-center items-center border shadow-lg rounded-lg py-5">
        <div className="text-center my-5 text-xl font-bold">
          Update <span className="text-blue-600">Profile</span>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 place-items-center">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="enter your name"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="profilePhoto" className="font-semibold">
                Profile Photo
              </label>
              <input
                type="file"
                placeholder="enter your name"
                onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="enter your email"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="font-semibold">
                Mobile
              </label>
              <input
                type="text"
                placeholder="enter mobile no."
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("mobile")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bio" className="font-semibold">
                Bio
              </label>
              <input
                type="text"
                placeholder="enter bio"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("bio")}
              />
            </div>
            <div
              className={`${
                authUser?.role === "recruiter" ? "hidden" : "flex flex-col"
              }`}
            >
              <label htmlFor="skills" className="font-semibold">
                Skills{" "}
                <span className="text-xs text-gray-600 flex flex-wrap">
                  (if adding multiple skills, separate by comma(,) no spaces)
                </span>
              </label>
              <input
                type="text"
                placeholder="enter skills"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("skills")}
              />
            </div>
            <div
              className={`${
                authUser?.role === "recruiter" ? "hidden" : "flex flex-col"
              }`}
            >
              <label htmlFor="" className="font-semibold">
                Resume{" "}
                <span className="text-xs text-gray-600">
                  (upload .pdf file)
                </span>
              </label>
              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="CurrentPassword" className="font-semibold">
                Current Password
              </label>
              <PasswordInput
                placeholder="current password"
                name="currentPassword"
                //@ts-expect-error current password
                register={register}
              />
            </div>{" "}
            <div className="flex flex-col">
              <label className="font-semibold">New Password</label>
              <PasswordInput
                placeholder="new password"
                name="newPassword"
                //@ts-expect-error new password
                register={register}
              />
            </div>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-md"
          >
            {isPending && !isError ? "Updating" : "Update"}
          </button>
          <p className="text-red-500">{isError && error.message}</p>
        </form>
      </div>
    </div>
  );
};

interface PasswordProps {
  placeholder: string;
  name: string;
  register: ReturnType<typeof import("react-hook-form").useForm>["register"];
}

const PasswordInput = ({ placeholder, name, register }: PasswordProps) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex w-80 border gap-1 items-center rounded-lg shadow-lg">
      <input
        placeholder={placeholder}
        type={show ? "text" : "password"}
        className=" w-80 rounded-md pl-2 py-1 outline-none"
        id={name}
        {...register(name)}
      />
      <img
        src={show ? closeeye : openeye}
        alt=""
        className="w-6 h-6 mr-1"
        onClick={handleShow}
      />
    </div>
  );
};

export default UpdateProfile;
