import { Link } from "react-router-dom";
import Bar from "../assets/Bar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import digitalocean from "../assets/digitalocean.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/auth/get");
        const data = await res.data;

        if (!data) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        console.log("error in authUser: ", error);
      }
    },
    retry: false,
  });

  function handleClick() {
    setOpen(!open);
    console.log(open);
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

        <a
          href="/profile"
          className={`${
            authUser
              ? "flex items-center border p-2 rounded-full shadow-lg"
              : "hidden"
          }`}
        >
          <img src={digitalocean} alt="" className="h-6 w-6" />
        </a>

        <div
          onClick={handleClick}
          className={`${authUser ? "md:hidden flex items-center" : "hidden"}`}
        >
          <Bar />
        </div>
        {open && (
          <div className="md:hidden top-16 bg-white absolute border right-1 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg">
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
