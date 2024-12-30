const UpdateProfile = () => {
  return (
    <div className="mt-28">
      <div className="text-center my-5 text-xl font-bold">
        Update <span className="text-blue-600">Profile</span>
      </div>
      <div className="flex flex-col max-w-3xl md:mx-auto mx-4 justify-center items-center border rounded-lg shadow-md py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4 place-items-center">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile" className="font-semibold">
              Mobile
            </label>
            <input
              type="text"
              className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bio" className="font-semibold">
              Bio
            </label>
            <input
              type="text"
              className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="skills" className="font-semibold">
              Skills{" "}
              <span className="text-xs text-gray-600 flex flex-wrap">
                (if adding multiple skills, separate by comma(,) no spaces)
              </span>
            </label>
            <input
              type="text"
              className="border w-80 rounded-md px-2 py-1 outline-none shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold">
              Resume
            </label>
            <input type="file" name="resume" id="resume" />
          </div>
        </div>
        <button className="border px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-md">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
