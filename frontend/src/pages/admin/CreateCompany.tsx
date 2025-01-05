import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/util";

interface CompanyProps {
  name?: string;
  tagline?: string;
  description?: string;
  website: string;
  location?: string;
}

const CreateCompany = () => {
  const [logo, setLogo] = useState<File | null>(null); // Store the file directly

  const { register, handleSubmit } = useForm<CompanyProps>({
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      website: "",
      location: "",
    },
  });

  const queryClient = useQueryClient();

  const {
    mutate: createCompany,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (data: CompanyProps) => {
      const formData = new FormData();

      formData.append("name", data.name || "");
      formData.append("tagline", data.tagline || "");
      formData.append("description", data.description || "");
      formData.append("website", data.website || "");
      formData.append("location", data.location || "");
      if (logo) {
        formData.append("logo", logo); // Directly append the File object
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/company/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data; // Assuming API response has data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company created successfully!");
    },
    onError: () => {
      toast.error("Failed to create company.");
    },
  });

  const handleFormSubmit = (data: CompanyProps) => {
    createCompany(data);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col max-w-xl md:max-w-3xl mx-auto max-sm:mx-4 my-4 justify-center items-center border shadow-lg rounded-lg py-5">
        <div className="text-center my-5 text-xl font-bold">
          Create <span className="text-blue-600">Company</span>
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          encType="multipart/form-data"
          className="place-items-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 place-items-center">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tagline" className="font-semibold">
                Tagline
              </label>
              <input
                type="text"
                placeholder="Enter tagline"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("tagline")}
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
              <label htmlFor="website" className="font-semibold">
                Website
              </label>
              <input
                type="text"
                placeholder="Enter company website"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("website")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="logo" className="font-semibold">
                Logo
              </label>
              <input
                type="file"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                onChange={(e) => setLogo(e.target.files?.[0] || null)} // Set File or null
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter company location"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
                {...register("location")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-md"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
          {isError && <p className="text-red-500"></p>}
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
