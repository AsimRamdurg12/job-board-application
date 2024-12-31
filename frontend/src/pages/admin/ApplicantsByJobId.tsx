const ApplicantsByJobId = () => {
  return (
    <div className="mt-28">
      <h1 className="text-center text-2xl font-bold">
        List of <span className="text-blue-600">Applicants</span>
      </h1>

      <div className="max-w-5xl flex justify-center items-center mt-5 md:mx-auto mx-4 border border-black rounded-lg">
        <table className="gap-2 w-full">
          <tr className="border-b border-black mx-1 text-blue-600">
            <th>Name</th>
            <th>Resume</th>
            <th>Status</th>
          </tr>
          <tr>
            <td className="text-center">Anom</td>
            <td className="text-center">19</td>
            <td className="text-center">
              <select className="outline-none">
                <option value="pending">Pending</option>
                <option value="accepted" className=" text-green-600">
                  Accepted
                </option>
                <option value="rejected" className="text-red-500">
                  Rejected
                </option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsByJobId;
