import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Job from "../components/Job";

const JobsPage = () => {
  const { data: getJobs } = useQuery({
    queryKey: ["getJobs"],
    queryFn: async () => {
      const res = await axios.get("/api/job/jobs");
      const result = await res.data;
      console.log(result);
      return result;
    },
  });

  return (
    <div className="mt-20">
      <div className="flex justify-center mt-24 h-full w-full">
        <div className="flex justify-center items-center gap-4 border mx-5 sm:mx-10 w-full sm:w-96 md:w-3/6 px-4 py-2 rounded-full shadow-lg">
          <input type="search" className="w-full outline-none" />

          <button className="border px-4 py-1 rounded-full bg-blue-600 text-white text-xl font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Job */}

      <div className="sm:mx-4 h-full mt-5 grid lg:grid-cols-2 xl:grid-cols-3">
        {/* Job To Apply */}
        <Link to="/job/:id">
          {getJobs?.length !== 0
            ? getJobs?.map((job) => (
                <Job key={job._id} job={job} />
                //     <div
                //       className="my-5 mx-3 sm:mx-2 border shadow-lg rounded-lg"
                //       key={job._id}
                //     >
                //       <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
                //         <div className="w-6 h-6">
                //           <Link to="/companies">
                //             <img
                //               src={job.company.logo}
                //               alt=""
                //               className="w-6 h-6 rounded-full"
                //             />
                //           </Link>
                //         </div>
                //         <div className="flex flex-col gap-2">
                //           <div className="flex justify-between">
                //             <div>
                //               <h1 className="sm:text-xl font-semibold">
                //                 {job.title}
                //               </h1>
                //               <p className="text-sm sm:font-semibold">
                //                 {job.company.name}
                //               </p>
                //             </div>
                //           </div>
                //           {/* Experience, Salary, Location */}
                //           <div className="text-gray-500 max-sm:text-sm">
                //             <ul className="flex items-center gap-4">
                //               <li className="flex items-center gap-2">
                //                 {" "}
                //                 <img
                //                   src={experience}
                //                   alt="experience"
                //                   className="w-3 h-3"
                //                 />{" "}
                //                 {job.experienceLevel}
                //               </li>{" "}
                //               |
                //               <li className="flex items-center gap-2">
                //                 <img src={rupee} alt="rupees" className="w-3 h-3" />{" "}
                //                 {job.salary}
                //               </li>{" "}
                //               |
                //               <li className="flex items-center gap-2">
                //                 <img
                //                   src={location}
                //                   alt="location"
                //                   className="w-4 h-4"
                //                 />
                //                 {job.location}
                //               </li>
                //             </ul>
                //           </div>

                //           {/* Job Description */}
                //           <div className="flex max-sm:text-sm items-center gap-2 text-gray-800">
                //             <img
                //               src={document}
                //               alt="job description"
                //               className="w-4 h-5 sm:w-3.5 sm:h-4"
                //             />
                //             <p>{job.description}</p>
                //           </div>

                //           {/* skills */}

                //           <div>
                //             <ul className="flex gap-2 text-gray-600 max-sm:text-sm">
                //               {job.requirements.map(
                //                 (requirement: string, index: number) => (
                //                   <li className="flex items-center" key={index}>
                //                     <img src={dot} alt="" className="w-6 h-6" />
                //                     {requirement}
                //                   </li>
                //                 )
                //               )}
                //             </ul>
                //           </div>
                //         </div>
                //         {/* <div className="">
                //   <Link to="/">
                //     <button className="w-full px-6 py-2 text-sm bg-blue-600 font-medium text-white rounded-md">
                //       Apply
                //     </button>
                //   </Link>
                // </div> */}
                //       </div>
                //     </div>
              ))
            : "No Jobs yet"}
        </Link>
      </div>
    </div>
  );
};

export default JobsPage;
