import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import experience from "../../assets/experience.svg";
import rupee from "../../assets/rupee.svg";
import location from "../../assets/location.svg";
import document from "../../assets/document.svg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/util";

const AdminJobs = () => {
  const [input, setInput] = useState<string | undefined>("");
  // const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: getJobs } = useQuery({
    queryKey: ["getJobs"],
    queryFn: async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/job/myjobs?keyword=${input}`
      );

      const result = await res.data;
      return result;
    },
  });

  const handleInput = () => {
    setInput(inputRef.current?.value);
    queryClient.invalidateQueries({ queryKey: ["getJobs"] });
  };

  const daysAgoFunction = (time: Date) => {
    const createdAt = new Date(time);
    const currentTime = new Date();
    //@ts-expect-error time
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center mt-24 h-full w-full relative">
        <div className="flex justify-center items-center gap-4 border mx-5 sm:mx-10 w-full sm:w-96 md:w-3/6 px-4 py-2 rounded-full shadow-lg">
          <input
            type="text"
            className="w-full outline-none"
            ref={inputRef}
            // value={input}
            name="input"
            placeholder="Search"
            onChange={handleInput}
          />
        </div>
        <button className="absolute right-5 border px-2 py-1 text-lg rounded-lg bg-orange-500 font-semibold text-white">
          <a href="/admin/job/create">Create Job</a>
        </button>
      </div>

      {/* Job */}

      <div className="sm:mx-4 h-full mt-5">
        {/* Job To Apply */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {getJobs?.length !== 0
            ? getJobs
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ?.filter((job: any) =>
                  job.title.toLowerCase().includes(input?.toLowerCase())
                ) // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((job: any) => (
                  <div className="mt-3">
                    <Link to={`/admin/job/${job?._id}`}>
                      <div
                        className=" mx-3 h-full sm:mx-2 border shadow-lg rounded-lg"
                        key={job?._id}
                      >
                        <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
                          <div className="w-6 h-6">
                            <Link to={`/admin/company/${job?.company?._id}`}>
                              <img
                                src={job?.company?.logo}
                                alt=""
                                className="w-6 h-6 rounded-full"
                              />
                            </Link>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <div>
                                <h1 className="sm:text-xl font-semibold">
                                  {job?.title}
                                </h1>
                                <p className="text-sm sm:font-semibold">
                                  {job?.company?.name}
                                </p>
                              </div>
                            </div>
                            {/* Experience, Salary, Location */}
                            <div className="text-gray-500 max-sm:text-sm">
                              <ul className="flex items-center gap-2">
                                <li className="flex items-center gap-2">
                                  {" "}
                                  <img
                                    src={experience}
                                    alt="experience"
                                    className="w-3 h-3"
                                  />{" "}
                                  {job?.experienceLevel}
                                </li>{" "}
                                |
                                <li className="flex items-center gap-2">
                                  <img
                                    src={rupee}
                                    alt="rupees"
                                    className="w-3 h-3"
                                  />{" "}
                                  {job?.salary}
                                </li>{" "}
                                |
                                <li className="flex items-center gap-2">
                                  <img
                                    src={location}
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                  {job?.location}
                                </li>
                              </ul>
                            </div>

                            {/* Job Description */}
                            <div className="flex max-sm:text-sm items-center gap-2 text-gray-800">
                              <img
                                src={document}
                                alt="job description"
                                className="w-4 h-5 sm:w-3.5 sm:h-4"
                              />
                              <p>{job?.tag}</p>
                            </div>

                            {/* skills */}

                            <div>
                              <ul className="flex gap-2 text-gray-600 max-sm:text-sm flex-wrap">
                                {job?.requirements?.map(
                                  (requirement: string, index: number) => (
                                    <li
                                      className="flex items-center border px-2 py-1 bg-blue-600 text-white font-medium rounded-full"
                                      key={index}
                                    >
                                      {requirement}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div className="text-sm text-gray-600">
                              {daysAgoFunction(job?.createdAt) === 0
                                ? "posted today"
                                : `${daysAgoFunction(job?.createdAt)} days ago`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
            : "No Jobs yet"}
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
