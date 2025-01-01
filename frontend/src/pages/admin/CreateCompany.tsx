import { FormEvent } from "react";

const CreateCompany = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col max-w-xl md:max-w-3xl mx-auto max-sm:mx-4 my-4 justify-center items-center border shadow-lg rounded-lg py-5">
        <div className="text-center my-5 text-xl font-bold">
          Create <span className="text-blue-600">Company</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 place-items-center">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="enter company name"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tagline" className="font-semibold">
                Tagline
              </label>
              <input
                type="text"
                placeholder="enter tagline"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                placeholder="enter description"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="website" className="font-semibold">
                Website
              </label>
              <input
                type="text"
                placeholder="enter company website"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="logo" className="font-semibold">
                logo
              </label>
              <input
                type="file"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="logo" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                placeholder="enter company location"
                className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-md"
          >
            Create
          </button>
          <p className="text-red-500"></p>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
