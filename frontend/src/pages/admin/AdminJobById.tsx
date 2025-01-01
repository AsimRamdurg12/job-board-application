import { Link, useParams } from "react-router-dom";
import experience from "../../assets/experience.svg";
import rupee from "../../assets/rupee.svg";
import location from "../../assets/location.svg";
import description from "../../assets/document.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dot from "../../assets/dot.svg";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminJobById = () => {
  const params = useParams();

  const { data: jobbyid, isLoading } = useQuery({
    queryKey: ["jobbyid"],
    queryFn: async () => {
      const response = await axios.get(`/api/job/${params.id}`);
      const result = await response.data;

      if (!result || !response) {
        console.log(result.error);
      }
      return result;
    },
  });

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 mx-auto flex flex-col items-center">
      <div className="max-w-5xl sm:mx-4 h-full mt-5 w-full">
        <div className="my-5 mx-3 sm:mx-5 mt-32 py-2 drop-shadow-2xl bg-white rounded-lg">
          <div className="flex justify-between gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 flex justify-center items-center">
                <Link to={`/admin/company/${jobbyid.company._id}`}>
                  <img
                    src={jobbyid?.company.logo}
                    alt=""
                    className="w-14 h-14 rounded-lg"
                  />
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div>
                    <h1 className="sm:text-xl font-semibold">
                      {jobbyid?.title}
                    </h1>
                    <p className="text-sm sm:font-semibold">
                      {jobbyid?.company?.name}
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
                      {jobbyid?.experienceLevel}
                    </li>{" "}
                    |
                    <li className="flex items-center gap-2">
                      <img src={rupee} alt="rupees" className="w-3 h-3" />{" "}
                      {jobbyid?.salary}
                    </li>{" "}
                    |
                    <li className="flex items-center gap-2">
                      <img src={location} alt="location" className="w-4 h-4" />
                      {jobbyid?.location}
                    </li>
                  </ul>
                </div>

                {/* Job Tag */}
                <div className="flex max-sm:text-sm items-center gap-2 text-gray-800">
                  <img
                    src={description}
                    alt="job description"
                    className="w-4 h-5 sm:w-3.5 sm:h-4"
                  />
                  <p>{jobbyid.tag}</p>
                </div>

                {/* skills */}

                <div>
                  <ul className="flex text-gray-600 flex-wrap max-sm:text-sm">
                    {jobbyid?.requirements?.map(
                      (req: string, index: number) => (
                        <li className="flex items-center" key={index}>
                          <img src={dot} alt="" className="w-6 h-6 " />
                          {req}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <a
                  href={`/admin/applicants/job/${jobbyid._id}`}
                  className="underline hover:text-black text-gray-600"
                >
                  {jobbyid.applications.length}{" "}
                  {jobbyid.applications.length === 1
                    ? "Applicant"
                    : "Applicants"}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* description */}

        <div className="border mx-4 drop-shadow-2xl leading-relaxed bg-white my-4 rounded-lg">
          <div className="mx-4 py-4">
            <h1 className="text-2xl font-semibold">Description</h1>
            <div>
              <br />
              <p className="font-bold">Responsibilities</p>
              <p>{jobbyid?.description}</p>
              <br />
              <p className="font-bold">Sounds Like You?</p>
              <p className="text-justify">
                <li>
                  3+ years of software development experience with excellent
                  coding skills experience with JavaScript, HTML5 & CSS.
                </li>

                <li>2+ years of experience in React.js & Webpack</li>

                <li>1+ years of experience in Next JS.</li>

                <li>
                  {" "}
                  1+ years of experience contributing to the architecture and
                  design (LLD, HLD, Solid principles and design patterns and
                  scaling) of new and current systems. Hands-on experience in
                  designing.
                </li>

                <li>
                  {" "}
                  Strong experience in technically leading junior
                  <li>developers with a focus on the goal.</li>
                  <li> Working experience with RESTful APIs. </li>
                  <li>
                    {" "}
                    Good to have knowledge of Database technology (SQL & NoSQL)
                    and React v18.{" "}
                  </li>
                  <li>
                    {" "}
                    Strong understanding in native JavaScript with data
                    structures & algorithms problem solving.
                  </li>
                  Good understanding to JS frameworks and MVC frameworks.{" "}
                </li>
                <li>
                  Strong understanding of Node.js and must have knowledge around
                  Node JS performance improvement.
                </li>
                <li>
                  {" "}
                  Good knowledge around the following topics: SEO, PWA,
                  Performance optimisation, Page speed optimisation.{" "}
                </li>
                <li>
                  Thorough understanding of State management tools like Redux
                  and Redux Saga.
                </li>
                <li>Thorough understanding of CSS & SASS.</li>
                <li>
                  Understanding UI rendering in both desktop & mobile devices.
                </li>
                <li>Good to have experience in writing test cases.</li>
              </p>
              <br />
              <ul>
                <li> Role: {jobbyid?.title} </li>

                <li>Employment Type: {jobbyid?.jobType} </li>
              </ul>
              <br />
              <p>Education</p>
              <br />
              <p>UG: Any Graduate, B.Tech/B.E. in Any Specialization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobById;
