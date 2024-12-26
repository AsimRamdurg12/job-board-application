import { Link } from "react-router-dom";
import microsoft from "../assets/microsoft.svg";

const CompanyById = () => {
  return (
    <div className="mt-20 w-full">
      <div className="border my-5">
        <div className="bg-gradient-to-br h-28 from-purple-50 via-orange-50 to-blue-50"></div>
      </div>
      <div className="mx-4 flex gap-8">
        <img
          src={microsoft}
          alt="microsoft"
          className="w-28 h-28 -mt-14 rounded-xl"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Microsoft Coporation Ltd.</h1>
          <p className="font-medium text-gray-600">We are a tech company</p>
        </div>
      </div>

      <div className="mt-16 mx-4 border p-2 rounded-xl shadow-lg">
        <h1 className="font-bold text-lg">About Microsoft Coporation Ltd.</h1>
        <p className="m-2 text-gray-500 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
          placeat cum quis nobis porro, reiciendis neque quibusdam in iusto
          esse, ratione vero odit voluptatibus hic corrupti quisquam quasi
          ducimus. Placeat.
        </p>
      </div>

      <div className="mx-4 mt-6 border">
        <div className="mx-4 my-4 text-lg font-medium">
          Jobs
          <p className="text-sm font-normal">33 Job Openings</p>
        </div>
        <div className="sm:mx-4 h-full mt-5 grid lg:grid-cols-2 xl:grid-cols-3">
          <Link to="/job/:id">
            <div className="my-5 mx-3 sm:mx-2 border shadow-lg rounded-lg">
              <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
                <div className="w-6 h-6">
                  <Link to="/company/:id">
                    <img
                      src={microsoft}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="sm:text-xl font-semibold">
                        Full Stack Developer
                      </h1>
                      <p className="text-sm sm:font-semibold">Microsoft</p>
                    </div>
                  </div>
                  {/* Experience, Salary, Location */}
                  <div className="text-gray-500 max-sm:text-sm">
                    <ul className="flex items-center gap-4">
                      <li className="flex items-center gap-2">
                        {" "}
                        <img
                          src={microsoft}
                          alt="experience"
                          className="w-3 h-3"
                        />{" "}
                        2 Years
                      </li>{" "}
                      |
                      <li className="flex items-center gap-2">
                        <img src={microsoft} alt="rupees" className="w-3 h-3" />{" "}
                        20 LPA
                      </li>{" "}
                      |
                      <li className="flex items-center gap-2">
                        <img
                          src={microsoft}
                          alt="location"
                          className="w-4 h-4"
                        />
                        Remote
                      </li>
                    </ul>
                  </div>

                  {/* Job Description */}
                  <div className="flex max-sm:text-sm items-center gap-2 text-gray-800">
                    <img
                      src={microsoft}
                      alt="job description"
                      className="w-4 h-5 sm:w-3.5 sm:h-4"
                    />
                    <p>All is well</p>
                  </div>

                  {/* skills */}

                  <div>
                    <ul className="flex gap-2 text-gray-600 max-sm:text-sm">
                      <li className="flex items-center">
                        {/* <img src={dot} alt="" className="w-6 h-6" /> */}
                        HTML
                      </li>
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

          {/* Job 2 */}
          <Link to="/job/:id">
            <div className="my-5 mx-3 sm:mx-2 border shadow-lg rounded-lg">
              <div className="flex gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
                <div className="w-6 h-6">
                  <Link to="/company/:id">
                    <img
                      src={microsoft}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="sm:text-xl font-semibold">
                        Full Stack Developer
                      </h1>
                      <p className="text-sm sm:font-semibold">Microsoft</p>
                    </div>
                  </div>
                  {/* Experience, Salary, Location */}
                  <div className="text-gray-500 max-sm:text-sm">
                    <ul className="flex items-center gap-4">
                      <li className="flex items-center gap-2">
                        {" "}
                        <img
                          src={microsoft}
                          alt="experience"
                          className="w-3 h-3"
                        />{" "}
                        2 Years
                      </li>{" "}
                      |
                      <li className="flex items-center gap-2">
                        <img src={microsoft} alt="rupees" className="w-3 h-3" />{" "}
                        20 LPA
                      </li>{" "}
                      |
                      <li className="flex items-center gap-2">
                        <img
                          src={microsoft}
                          alt="location"
                          className="w-4 h-4"
                        />
                        Remote
                      </li>
                    </ul>
                  </div>

                  {/* Job Description */}
                  <div className="flex max-sm:text-sm items-center gap-2 text-gray-800">
                    <img
                      src={microsoft}
                      alt="job description"
                      className="w-4 h-5 sm:w-3.5 sm:h-4"
                    />
                    <p>All is well</p>
                  </div>

                  {/* skills */}

                  <div>
                    <ul className="flex gap-2 text-gray-600 max-sm:text-sm">
                      <li className="flex items-center">
                        {/* <img src={dot} alt="" className="w-6 h-6" /> */}
                        HTML
                      </li>
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
      </div>
    </div>
  );
};

export default CompanyById;
