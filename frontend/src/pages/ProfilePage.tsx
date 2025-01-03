import email from "../assets/email.svg";
import mobile from "../assets/mobile.svg";
import skills from "../assets/skills.svg";
import useProfile from "../hooks/useProfile";
import menu from "../assets/menu.svg";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProfilePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(null);

  const { authUser } = useProfile();

  const { data: appliedJobs } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: async () => {
      const res = await axios.get("/api/apply/get");
      const result = await res.data;
      return result;
    },
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      //@ts-expect-error e.target
      if (!openRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="h-full mt-36 px-4 border max-w-xl md:mx-auto rounded-xl shadow-lg mx-4 pb-4 flex flex-col items-center gap-4">
        <div className="mb-20 mt-5 w-full flex justify-center relative">
          <img
            src={authUser?.profile.profilePhoto}
            alt=""
            className="h-20 w-20 rounded-full absolute"
          />

          <div className="absolute right-0" ref={openRef}>
            <img
              src={menu}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="bg-white absolute border hover:bg-gray-100 px-2 py-1 right-1 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg">
                <a href="/profile/update">Update</a>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-2xl">{authUser?.name}</h1>
          <p className="text-xs font-medium text-gray-500">
            {authUser?.role.toUpperCase()}
          </p>
        </div>

        <div className="text-center text-sm">
          Bio:
          <p className="text-gray-600">
            {authUser?.profile.bio === undefined ? "" : authUser?.profile.bio}
          </p>
        </div>
        <div className="text-gray-700 flex gap-4">
          <p className="flex items-center gap-1">
            <img src={email} alt="email" className="h-4 w-4" />
            <span>{authUser?.email}</span>
          </p>{" "}
          |
          <p className="flex items-center gap-1">
            <img src={mobile} alt="" className="h-4 w-4" />
            <span>+91-{authUser?.mobile}</span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center text-gray-700">
          <img src={skills} alt="skills" className="h-4 w-4 mr-2" />

          <div className="flex items-center gap-1">
            {authUser?.profile?.skills?.map((skill: string, index: number) => (
              <p
                key={index}
                className="border px-2 py-1 rounded-full bg-blue-600 text-white font-medium"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

        <a
          href={authUser?.profile.resume}
          target="_blank"
          className="hover:underline text-gray-700 hover:text-black"
        >
          {authUser?.profile.resumeOriginalName}
        </a>
      </div>

      {/* Applied Jobs */}
      <div className="w-full max-w-xl">
        {authUser?.role === "employee" && (
          <div className="mx-auto bg-white shadow-lg flex flex-col justify-center items-center mt-10 border px-4 py-2 rounded-xl">
            <h1 className="flex justify-start w-full my-4 text-lg font-semibold">
              Applied Jobs
            </h1>
            <table className="border w-full border-black">
              <thead>
                <tr className="border-b border-black mx-1 text-blue-600">
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs ? (
                  appliedJobs?.map(
                    (
                      applied: {
                        job: {
                          title: string;
                          _id: string;
                          company: { name: string; _id: number };
                        };
                        status: string;
                      },
                      index: number
                    ) => (
                      <tr className="border-gray-300 text-center" key={index}>
                        <td className="font-medium">
                          <a
                            href={`/job/${applied?.job?._id}`}
                            className="hover:underline"
                          >
                            {applied?.job?.title}
                          </a>
                        </td>
                        <td className="font-medium">
                          <a
                            href={`/company/${applied?.job?.company._id}`}
                            className="hover:underline"
                          >
                            {applied?.job?.company?.name}
                          </a>
                        </td>
                        <td
                          className={`${
                            applied.status === "rejected"
                              ? "text-red-500 underline"
                              : applied.status === "pending"
                              ? "text-gray-40 underline0"
                              : "text-green-5 underline00"
                          } font-medium`}
                        >
                          {applied?.status?.toUpperCase()}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>No applied Jobs</tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
