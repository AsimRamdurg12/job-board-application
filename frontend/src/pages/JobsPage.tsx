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

      <div className="sm:mx-4 h-full mt-5">
        {/* Job To Apply */}
        <Link
          to="/job/:id"
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {getJobs?.length !== 0
            ? getJobs?.map((job) => <Job key={job._id} job={job} />)
            : "No Jobs yet"}
        </Link>
      </div>
    </div>
  );
};

export default JobsPage;
