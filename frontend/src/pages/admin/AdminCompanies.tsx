import { Link } from "react-router-dom";
import arrowright from "../../assets/arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminCompanies = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axios.get("/api/company/mycompanies");
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
      <div className="flex justify-center mb-10 relative">
        <h1 className="text-3xl font-bold text-blue-600">List of Companies</h1>
        <div className="absolute right-3">
          <button className="border rounded-lg bg-orange-500 text-white px-4 py-1 text-lg font-semibold">
            <a href="/admin/company/create">Create</a>
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {companies
          ? companies.map(
              (company: {
                _id: string;
                logo: string | undefined;
                name: string | undefined;
                job: string;
                tagline: string;
              }) => (
                <Link to={`/admin/company/${company._id}`} key={company._id}>
                  <div className="flex gap-4 h-full border my-2 shadow-lg py-4 px-4 rounded-lg">
                    <div className="w-12 h-12">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full rounded-lg h-full"
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="space-y-2">
                        <div>
                          <h1 className="text-xl font-semibold">
                            {company.name}
                          </h1>
                          <p className="text-xs text-gray-500">
                            {company.job.length === 1
                              ? "1 Job Opening"
                              : `${company.job.length} Job Openings`}
                          </p>
                        </div>
                        <div className="text-gray-600">{company.tagline}</div>
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

export default AdminCompanies;
