import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

interface CompanyProps {
  name?: string;
  tagline?: string;
  description?: string;
  website: string;
  location?: string;
}

const UpdateCompany = () => {
  const [logo, setLogo] = useState<File | null>(null); // Store the file directly

  const params = useParams();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const res = await axios.get(`/api/company/${params.id}`);
      const result = await res.data;
      console.log(result);

      return res.data;
    },
  });

  console.dir(company);

  const { register, handleSubmit } = useForm<CompanyProps>({
    defaultValues: {
      name: company?.name,
      tagline: company?.tagline,
      description: company?.description,
      website: company?.website,
      location: company?.location,
    },
  });

  const queryClient = useQueryClient();

  const {
    mutate: updateCompany,
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
        `/api/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      return res.data; // Assuming API response has data
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["companies"] }),
        queryClient.invalidateQueries({ queryKey: ["company"] }),
      ]);
      toast.success("Company Updated");
    },
    onError: () => {
      toast.error("Failed to update company.");
    },
  });

  const handleFormSubmit = (data: CompanyProps) => {
    updateCompany(data);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  if (company?.name === undefined) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div className="flex flex-col max-w-xl md:max-w-3xl mx-auto max-sm:mx-4 my-4 justify-center items-center border shadow-lg rounded-lg py-5">
        <div className="text-center my-5 text-xl font-bold">
          Update <span className="text-blue-600">Company</span>
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
            {isPending ? "Updating..." : "Update"}
          </button>
          {isError && <p className="text-red-500"></p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateCompany;
