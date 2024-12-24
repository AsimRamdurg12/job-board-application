import { Link } from "react-router-dom";
import google from "../assets/google.svg";
import arrowright from "../assets/arrow-right.svg";

const CompanyPage = () => {
  return (
    <div className="mt-28 h-full mx-4">
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600">List of Companies</h1>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <Link to="/company/:id">
          <div className="flex gap-4 border mx-4 py-4 px-4 rounded-lg w-fit">
            <div className="w-12 h-12">
              <img src={google} alt="google" className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <h1 className="text-xl font-semibold">Google</h1>
                  <p className="text-sm text-gray-500">5 Job openings</p>
                </div>
                <div className="flex">Provide Search Engine</div>
              </div>
              <img src={arrowright} alt="arrow" className="h-4 w-4" />
            </div>
          </div>
        </Link>

        <Link to="/company/:id">
          <div className="flex gap-4 border mx-4 py-4 px-4 rounded-lg w-fit">
            <div className="w-12 h-12">
              <img src={google} alt="google" className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <h1 className="text-xl font-semibold">Google</h1>
                  <p className="text-sm text-gray-500">5 Job openings</p>
                </div>
                <div className="flex ">Provide Search Engine</div>
              </div>
              <img src={arrowright} alt="arrow" className="h-4 w-4" />
            </div>
          </div>
        </Link>

        <Link to="/company/:id">
          <div className="flex gap-4 border mx-4 py-4 px-4 rounded-lg w-fit">
            <div className="w-12 h-12">
              <img src={google} alt="google" className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <h1 className="text-xl font-semibold">Google</h1>
                  <p className="text-sm text-gray-500">5 Job openings</p>
                </div>
                <div className="flex ">Provide Search Engine</div>
              </div>
              <img src={arrowright} alt="arrow" className="h-4 w-4" />
            </div>
          </div>
        </Link>

        <Link to="/company/:id">
          <div className="flex gap-4 border mx-4 py-4 px-4 rounded-lg w-fit">
            <div className="w-12 h-12">
              <img src={google} alt="google" className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div>
                  <h1 className="text-xl font-semibold">Google</h1>
                  <p className="text-sm text-gray-500">5 Job openings</p>
                </div>
                <div className="flex">Provide Search Engine</div>
              </div>
              <img src={arrowright} alt="arrow" className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
