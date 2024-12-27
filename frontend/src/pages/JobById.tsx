import { Link } from "react-router-dom";
import microsoft from "../assets/microsoft.svg";

const JobById = () => {
  return (
    <div className=" h-full bg-gray-100 mx-auto flex flex-col items-center">
      <div className="max-w-5xl sm:mx-4 h-full mt-5 w-full">
        <div className="my-5 mx-3 sm:mx-5 mt-32 py-2 drop-shadow-2xl bg-white rounded-lg">
          <div className="flex justify-between gap-2 sm:gap-4 sm:mx-4 mx-2 my-4">
            <div className="flex gap-4">
              <div className="w-20 h-20">
                <Link to="/company/:id">
                  <img src={microsoft} alt="" />
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
                      <img src={microsoft} alt="location" className="w-4 h-4" />
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
            </div>
            <div className="">
              <Link to="/">
                <button className="w-full px-6 py-2 text-sm bg-blue-600 font-medium text-white rounded-md">
                  Apply
                </button>
              </Link>
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
              <p>
                Lead, Design, build, and maintain high performance, reusable,
                and reliable code Translate storyboards and use cases into
                functional applications. Read wireframes and produce clean
                front-end code and when UI wireframes are not available, come up
                with basic UI design. Coordinate with back-end developers in
                integrating with front-end code. Perform analysis / debugging of
                UI / UX in production systems during troubleshooting/ emergency.
                Perform (pre/post development) cross-browser compatibility tests
                and generate compatibility reports.
              </p>
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
                <li> Role: Front End Developer </li>
                <li>Industry Type: FinTech / Payments </li>
                <li>Department: Engineering - Software & QA </li>
                <li>Employment Type: Full Time, Permanent </li>
                <li>Role Category: Software Development </li>
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

export default JobById;
