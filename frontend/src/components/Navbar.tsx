import { Link } from "react-router-dom";
import Bar from "../assets/Bar";
import { useEffect, useRef, useState } from "react";
import useProfile from "../hooks/useProfile";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const menuRef = useRef(null);

  const { authUser } = useProfile();

  useEffect(() => {
    //@ts-expect-error handleClcik
    function handleClick(e) {
      //@ts-expect-error e.target
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleProfile() {
    setProfile(!profile);
    console.log(profile);
  }

  return (
    <div className="fixed z-50 top-0 bg-white h-20 min-w-full border-b-2 flex items-center justify-between">
      <a className="text-xl text-blue-600 font-bold uppercase mx-2" href="/">
        Jobs.<span className="text-orange-500">me</span>
      </a>
      <div
        className={`
          
          ${
            authUser
              ? "hidden md:flex justify-between items-center gap-4"
              : "hidden"
          }
            
        `}
      >
        <Link to="/" className=" text-gray-500 hover:text-black">
          Home
        </Link>
        <Link to="/companies" className=" text-gray-500 hover:text-black">
          Companies
        </Link>
        <Link to="/jobs" className=" text-gray-500 hover:text-black">
          Jobs
        </Link>
      </div>
      <div className="flex gap-4 mx-2">
        <div className={`${!authUser ? "flex gap-4" : "hidden"}`}>
          <Link
            className="border px-4 py-2 rounded-full border-blue-600 text-blue-600 font-semibold"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-white bg-orange-500 px-4 py-2 rounded-full font-semibold"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>

        <div
          onClick={handleProfile}
          className={`${
            authUser
              ? "flex items-center border p-2 rounded-full shadow-lg"
              : "hidden"
          }`}
        >
          <img src={authUser.profilePhoto} alt="" className="h-6 w-6" />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className={`${authUser ? "md:hidden flex items-center" : "hidden"}`}
        >
          <Bar />
        </div>
        {open && (
          <div
            ref={menuRef}
            className="md:hidden top-16 bg-white absolute border right-1 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg"
          >
            <a href="/" className="hover:bg-gray-100 p-2">
              Home
            </a>
            <a href="/companies" className="hover:bg-gray-100 p-2">
              Companies
            </a>
            <a href="/jobs" className="hover:bg-gray-100 p-2">
              Jobs
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
