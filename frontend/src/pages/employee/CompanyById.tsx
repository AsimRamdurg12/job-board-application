import { Link, useParams } from "react-router-dom";
import experience from "../../assets/experience.svg";
import rupee from "../../assets/rupee.svg";
import location from "../../assets/location.svg";
import document from "../../assets/document.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key } from "react";

const CompanyById = () => {
  const params = useParams();

  const { data: company } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const res = await axios.get(`/api/company/${params.id}`);
      const result = res.data;

      return result;
    },
  });

  const { data: companyJobs } = useQuery({
    queryKey: ["companyJobs"],
    queryFn: async () => {
      const res = await axios.get(`/api/company/${params.id}/jobs`);
      const result = res.data;

      if (!result) {
        console.log(result.error);
      }
      return result;
    },
  });

  return (
    <div className="mt-20 w-full" key={params.id}>
      <div className="border my-5">
        <div className="bg-gradient-to-br h-28 from-purple-50 via-orange-50 to-blue-50"></div>
      </div>
      <div className="mx-4 flex gap-8">
        <img
          src={company?.logo}
          alt={company?.name}
          className="w-28 h-28 -mt-14 rounded-xl"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{company?.name}</h1>
          <p className="font-medium text-gray-600">{company?.tagline}</p>
        </div>
      </div>

      <div className="mt-16 mx-4 border p-2 rounded-xl shadow-lg">
        <h1 className="font-bold text-lg">About {company?.name}.</h1>
        <p className="m-2 text-gray-500 ">{company?.description}</p>
      </div>

      <div className="mx-4 mt-6 border rounded-lg shadow-lg mb-4">
        <div className="mx-4 mt-4 text-lg font-medium">Jobs</div>
        <div className="sm:mx-4 h-full grid lg:grid-cols-2 xl:grid-cols-3">
          {companyJobs?.length === 0 ? (
            <div className="flex justify-center items-center mb-5">No Jobs</div>
          ) : (
            companyJobs?.map(
              (companyJob: {
                _id: Key;
                title: string;
                experienceLevel: string;
                salary: string;
                location: string;
                tag: string;
                requirements: string;
              }) => (
                <Link to={`/job/${companyJob?._id}`} key={companyJob?._id}>
                  <div className="my-5 mx-3 sm:mx-2 border shadow-lg rounded-lg">
                    <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
                      <div className="w-6 h-6">
                        <Link to="/company/:id">
                          <img
                            src={company?.logo}
                            alt=""
                            className="w-6 h-6 rounded-full"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <div>
                            <h1 className="sm:text-xl font-semibold">
                              {companyJob?.title}
                            </h1>
                            <p className="text-sm sm:font-semibold">
                              {company?.name}
                            </p>
                          </div>
                        </div>
                        {/* Experience, Salary, Location */}
                        <div className="text-gray-500 max-sm:text-sm">
                          <ul className="flex items-center gap-4">
                            <li className="flex items-center gap-2">
                              {" "}
                              <img
                                src={experience}
                                alt="experience"
                                className="w-3 h-3"
                              />{" "}
                              {companyJob?.experienceLevel}
                            </li>{" "}
                            |
                            <li className="flex items-center gap-2">
                              <img
                                src={rupee}
                                alt="rupees"
                                className="w-3 h-3"
                              />{" "}
                              {companyJob?.salary}
                            </li>{" "}
                            |
                            <li className="flex items-center gap-2">
                              <img
                                src={location}
                                alt="location"
                                className="w-4 h-4"
                              />
                              {companyJob?.location}
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
                          <p>{companyJob?.tag}</p>
                        </div>

                        {/* skills */}

                        <div>
                          <ul className="flex gap-2 text-gray-600 max-sm:text-sm flex-wrap">
                            {
                              //@ts-expect-error no errors in map
                              companyJob?.requirements?.map(
                                (skill: string, index: number) => (
                                  <li
                                    key={index}
                                    className="flex items-center border px-2 py-1 bg-blue-600 text-white font-medium rounded-full"
                                  >
                                    {skill}
                                  </li>
                                )
                              )
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyById;
