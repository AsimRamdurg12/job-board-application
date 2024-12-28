import { Link } from "react-router-dom";
import arrowright from "../assets/arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const CompanyPage = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axios.get("/api/company/companies");
      const result = await res.data;

      console.log(result);

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
    <div className="mt-28 h-full mx-4">
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold text-blue-600">List of Companies</h1>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <Link to="/company/:id">
          {companies
            ? companies.map((company) => (
                <div className="flex gap-4 border my-2 space mx-4 py-4 px-4 rounded-lg">
                  <div className="w-12 h-12">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-2">
                      <div>
                        <h1 className="text-xl font-semibold">
                          {company.name}
                        </h1>
                        <p className="text-xs text-gray-500">
                          {company.job.length === 0 ? "No" : company.job.length}{" "}
                          Job openings
                        </p>
                      </div>
                      <div className="text-gray-600">{company.tagline}</div>
                    </div>
                    <div>
                      <img src={arrowright} alt="arrow" className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))
            : "No Companies"}
        </Link>
      </div>
    </div>
  );
};

export default CompanyPage;
