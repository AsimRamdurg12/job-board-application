import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/util";

interface CreateJobProps {
  title?: string;
  tag?: string;
  description?: string;
  requirements?: string;
  salary?: string;
  experienceLevel?: string;
  location?: string;
  position?: string;
  jobType?: string;
  companyId: string;
}

const CreateJob = () => {
  const { register, handleSubmit } = useForm<CreateJobProps>({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      requirements: "",
      salary: "",
      experienceLevel: "",
      location: "",
      position: "",
      jobType: "",
      companyId: "",
    },
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/company/mycompanies`);
      const result = await res.data;

      console.log(result);

      return result;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createJob, isPending } = useMutation({
    mutationFn: async (data: CreateJobProps) => {
      const formdata = new FormData();
      formdata.append("title", data.title || "");
      formdata.append("tag", data.tag || "");
      formdata.append("description", data.description || "");
      formdata.append("requirements", data.requirements || "");
      formdata.append("salary", data.salary || "");
      formdata.append("experienceLevel", data.experienceLevel || "");
      formdata.append("jobType", data.jobType || "");
      formdata.append("position", data.position || "");
      formdata.append("location", data.location || "");
      formdata.append("company", data.companyId || "");

      const res = await axios.post(`${BACKEND_URL}/api/job/create`, formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.data;
      console.log(result);

      return result;
    },
    onSuccess: () => {
      toast.success("Job Created");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error) => {
      toast.error("Error while creating Job");
      console.log(error.message);
    },
  });

  const handleChange = (data: CreateJobProps) => {
    createJob(data);
    console.log(data);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col max-w-xl md:max-w-3xl mx-auto max-sm:mx-4 my-4 justify-center items-center border shadow-lg rounded-lg py-5">
        <div className="text-center my-5 text-xl font-bold">
          Create <span className="text-blue-600">Job</span>
        </div>
        <form
          className="place-items-center"
          onSubmit={handleSubmit(handleChange)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 place-items-center">
            <div className="flex flex-col">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Job Title"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("title")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tag" className="font-semibold">
                Tag
              </label>
              <input
                type="text"
                placeholder="Enter tag"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("tag")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                placeholder="Enter description"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="requirements" className="font-semibold">
                Requirements
              </label>
              <input
                type="text"
                placeholder="Enter requirements"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("requirements")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="salary" className="font-semibold">
                Salary
              </label>
              <input
                type="text"
                placeholder="Salary(in LPA)"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("salary")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="experience" className="font-semibold">
                Experience
              </label>
              <input
                type="text"
                placeholder="Experience in Years"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("experienceLevel")}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter job location"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("location")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="font-semibold">
                Positions
              </label>
              <input
                type="number"
                placeholder="No. of Positions"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("position")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="jobType" className="font-semibold">
                Job Type
              </label>
              <input
                type="text"
                placeholder="Full Time/Internship"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("jobType")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="company" className="font-semibold">
                Company
              </label>
              <select
                {...register("companyId")}
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              >
                <option value="">Company Name</option>
                {companies?.map(
                  (company: { _id: string; name: string }, index: number) => (
                    <option key={index} value={company._id}>
                      {company?.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-md"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
