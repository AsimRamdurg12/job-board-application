import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/util";

const ApplicantsByJobId = () => {
  const params = useParams();

  const applicationStatus = ["pending", "rejected", "accepted"];

  const { data: applicants } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/apply/applicants/${params.id}`
      );
      const result = res.data;
      console.log(result);

      return result;
    },
  });

  const statusHandler = async (status: string, id: Key) => {
    console.log("called");

    axios.defaults.withCredentials = true;
    const res = await axios.post(`${BACKEND_URL}/api/apply/status/${id}`, {
      status,
    });
    console.log(res);
    if (res.data.application.status) {
      toast.success(`application ${res.data.application.status}`);
    }
  };

  return (
    <div className="mt-28">
      <h1 className="text-center text-2xl font-bold">
        List of <span className="text-blue-600">Applicants</span>
      </h1>

      <div className="max-w-5xl flex justify-center items-center mt-5 md:mx-auto mx-4 border border-black rounded-lg">
        <table className="gap-2 w-full">
          <thead>
            <tr className="border-b border-black mx-1 text-blue-600">
              <th>Name</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              applicants.applications.map((application: any, index: number) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-center">
                    {application?.applicant?.name || "N/A"}
                  </td>
                  <td className="text-center">
                    {application?.applicant?.profile.resume ? (
                      <a
                        href={application?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {application?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td className="place-items-center">
                    <select
                      className=" px-2 flex flex-col font-medium gap-2"
                      onChange={(e) =>
                        statusHandler(e.target.value, application._id)
                      }
                    >
                      <option>{application?.status}</option>
                      {applicationStatus?.map((status, index) => {
                        return (
                          <option
                            value={status}
                            key={index}
                            className="flex items-center my-2 cursor-pointer"
                          >
                            {status}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsByJobId;
