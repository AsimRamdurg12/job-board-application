import JobSeeker from "../assets/job-seeker.jpg";
import heart from "../assets/heartbreak.svg";
import feedback from "../assets/feedback.svg";
import description from "../assets/description.svg";
import JobDesc from "../assets/jobdesc.jpg";
import recruiter from "../assets/employer.png";
import application from "../assets/application.png";

const Works = () => {
  return (
    <div className="mt-20 mx-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 place-items-center">
        <img
          src={JobSeeker}
          alt="Job Seeker"
          className="mx-4 max-w-full h-auto rounded-lg shadow-lg"
          height="600"
          width="600"
        />
        <div className="flex flex-col mx-4 gap-4 mt-4 lg:mt-0">
          <p className="w-fit px-4 py-2 bg-blue-100 rounded-full">
            The Problem
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-medium sm:font-bold">
            Getting a perfect job can be{" "}
            <span className="text-orange-500">stressful</span> and{" "}
            <span className="text-orange-500">time-consuming.</span>
          </h1>
          <div className="flex flex-col gap-4">
            <p className="flex items-center text-lg font-medium gap-2">
              <img
                src={description}
                alt="description"
                className="w-10 h-10 p-2 bg-blue-50 shadow-lg rounded-full"
              />
              Unclear Job Descriptions.
            </p>
            <p className="flex items-center text-lg font-medium gap-2">
              <img
                src={feedback}
                alt="feedback"
                className="w-10 h-10 p-2 bg-blue-50 shadow-lg rounded-full"
              />
              lack of feedback from recruiters.
            </p>

            <p className="flex items-center text-lg font-medium gap-2">
              <img
                src={heart}
                alt="heart"
                className="h-10 w-10 p-2 bg-blue-50 shadow-lg rounded-full"
              />
              Low confidence due multiple rejections.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 items-center mt-10">
        <p className="w-fit px-4 py-2 bg-orange-100 rounded-full">
          The Solution
        </p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-medium sm:font-bold">
          Your one stop
          <span className="text-orange-500"> solution</span> to your
          <span className="text-orange-500"> dream job.</span>
        </h1>
        <div className="w-full h-full border bg-orange-300 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4 p-5 gap-4 border bg-white rounded-2xl">
            <div className="w-full h-full flex flex-col items-center gap-2">
              <img
                src={JobDesc}
                alt=""
                className="object-contain h-full w-full rounded-lg shadow-lg border-8 border-blue-200"
              />
              <p className="text-lg text-gray-500">
                Accurate Job Descriptions for better clarity.
              </p>
            </div>
            <div className="w-fit h-fit flex flex-col items-center gap-2">
              <img
                src={recruiter}
                alt="recruiter giving feedback"
                className="object-contain h-full w-full rounded-lg shadow-lg border-8 border-blue-200"
              />
              <p className="text-lg text-gray-500">
                Feedback from recruiters for better improvement
              </p>
            </div>
            <div className="w-fit h-fit flex flex-col items-center gap-2">
              <img
                src={application}
                alt="recruiter giving feed"
                className="object-contain h-full w-full rounded-lg shadow-lg border-8 border-blue-200"
              />
              <p className="text-lg text-gray-500">
                Hassle free process to get hired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
