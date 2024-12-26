import rupee from "../assets/rupee.svg";
import location from "../assets/location.svg";
import experience from "../assets/experience.svg";
import document from "../assets/document.svg";
import dot from "../assets/dot.svg";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  return (
    <div>
      <Link to="/job/:id">
        <div
          className="my-5 mx-3 sm:mx-2 border shadow-lg rounded-lg"
          key={job._id}
        >
          <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
            <div className="w-6 h-6">
              <Link to="/company/:id">
                <img
                  src={job.company?.logo}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  <h1 className="sm:text-xl font-semibold">{job.title}</h1>
                  <p className="text-sm sm:font-semibold">
                    {job.company?.name}
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
                    {job.experienceLevel}
                  </li>{" "}
                  |
                  <li className="flex items-center gap-2">
                    <img src={rupee} alt="rupees" className="w-3 h-3" />{" "}
                    {job.salary}
                  </li>{" "}
                  |
                  <li className="flex items-center gap-2">
                    <img src={location} alt="location" className="w-4 h-4" />
                    {job.location}
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
                <p>{job.description}</p>
              </div>

              {/* skills */}

              <div>
                <ul className="flex gap-2 text-gray-600 max-sm:text-sm">
                  {job.requirements.map(
                    (requirement: string, index: number) => (
                      <li className="flex items-center" key={index}>
                        <img src={dot} alt="" className="w-6 h-6" />
                        {requirement}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="">
              <Link to="/">
                <button className="w-full px-6 py-2 text-sm bg-blue-600 font-medium text-white rounded-md">
                  Apply
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Job;
