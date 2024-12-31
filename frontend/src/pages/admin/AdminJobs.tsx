import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Job from "../../components/Job";
import { useRef, useState } from "react";

const AdminJobs = () => {
  const [input, setInput] = useState<string | undefined>("");
  // const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: getJobs } = useQuery({
    queryKey: ["getJobs"],
    queryFn: async () => {
      const res = await axios.get(`/api/job/myjobs?keyword=${input}`);
      console.log(res);

      const result = await res.data;
      return result;
    },
  });

  const handleInput = () => {
    setInput(inputRef.current?.value);
    queryClient.invalidateQueries({ queryKey: ["getJobs"] });
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center mt-24 h-full w-full">
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
                .map((job: any) => <Job key={job._id} job={job} />)
            : "No Jobs yet"}
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
