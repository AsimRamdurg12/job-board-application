import { Link } from "react-router-dom";
import arrowright from "../../assets/arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BACKEND_URL } from "../../utils/util";

const CompanyPage = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_URL}/api/company/companies`);
      const result = await res.data;

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
        {companies
          ? companies?.map(
              (company: {
                _id: string;
                logo: string | undefined;
                name: string | undefined;
                job: string;
                tagline: string;
              }) => (
                <Link to={`/company/${company?._id}`}>
                  <div
                    className="flex gap-4 h-full border my-2 space mx-4 py-4 px-4 rounded-lg"
                    key={company?._id}
                  >
                    <div className="w-12 h-12">
                      <img
                        src={company?.logo}
                        alt={company?.name}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-2">
                        <div>
                          <h1 className="text-xl font-semibold">
                            {company?.name}
                          </h1>
                          <p className="text-xs text-gray-500">
                            {company?.job?.length === 0
                              ? "No"
                              : company?.job?.length}{" "}
                            Job openings
                          </p>
                        </div>
                        <div className="text-gray-600">{company?.tagline}</div>
                      </div>
                      <div>
                        <img src={arrowright} alt="arrow" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )
          : "No Companies"}
      </div>
    </div>
  );
};

export default CompanyPage;
