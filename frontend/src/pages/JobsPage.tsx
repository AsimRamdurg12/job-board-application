import Google from "../assets/google.svg";
import rupee from "../assets/rupee.svg";
import location from "../assets/location.svg";
import experience from "../assets/experience.svg";
import document from "../assets/document.svg";
import { Link } from "react-router-dom";
// import dot from "../assets/dot.svg";

const JobsPage = () => {
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

      <div className="mx-4 h-full mt-5">
        {/* Job To Apply */}
        <div className="my-5 mx-2 border shadow-lg rounded-lg">
          <div className="flex gap-4 mx-4 my-4">
            <div>
              <Link to="/companies">
                <img src={Google} alt="" className="w-6 h-6 rounded-full" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-xl font-semibold">
                  Senior Frontend Developer
                </h1>
                <p className="text-sm font-semibold">Google</p>
              </div>
              {/* Experience, Salary, Location */}
              <div className="text-gray-500">
                <ul className="flex items-center gap-8">
                  <li className="flex items-center gap-2">
                    {" "}
                    <img
                      src={experience}
                      alt="experience"
                      className="w-3 h-3"
                    />{" "}
                    3-5 Yrs
                  </li>{" "}
                  |
                  <li className="flex items-center gap-2">
                    <img src={rupee} alt="rupees" className="w-3 h-3" /> 12 - 15
                    LPA
                  </li>{" "}
                  |
                  <li className="flex items-center gap-2">
                    <img src={location} alt="location" className="w-4 h-4" />
                    Remote - Pune
                  </li>
                </ul>
              </div>

              {/* Job Description */}
              <div className="flex items-center gap-2 text-gray-800">
                <img
                  src={document}
                  alt="hob description"
                  className="w-3.5 h-4"
                />
                <p>
                  We are looking for a senior engineer with expertise in React
                  JS and Next JS
                </p>
              </div>

              {/* skills */}

              <div>
                <ul className="flex justify-between text-gray-600">
                  <li>
                    {/* <img src={dot} alt="" className="w-6 h-6" /> */}
                    HTML
                  </li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>React JS</li>
                  <li>Next JS</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
            </div>
            <div className="">
              <Link to="/">
                <button className="w-full px-6 py-2 bg-blue-600 font-medium text-white rounded-md">
                  Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
