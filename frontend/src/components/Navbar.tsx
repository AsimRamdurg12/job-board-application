import { Link } from "react-router-dom";
import Bar from "../assets/Bar";
import { useEffect, useRef, useState } from "react";
import logoutimg from "../assets/logout.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useProfile from "../hooks/useProfile";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const openRef = useRef(null);
  const profileRef = useRef(null);

  const { authUser } = useProfile();

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post("/api/auth/logout");
        const result = res.data;

        console.log(result);

        if (!result) {
          console.log(result.error);

          return result;
        }
      } catch (error) {
        throw new Error(`Error while Logout: ${error}`);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      //@ts-expect-error e.target
      if (!openRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    function handleProfile(e: MouseEvent) {
      //@ts-expect-error e.target
      if (!profileRef.current?.contains(e.target)) {
        setProfile(false);
      }
    }
    document.addEventListener("mousedown", handleProfile);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("mousedown", handleProfile);
    };
  }, []);

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
        <div onClick={() => setProfile(!profile)} ref={profileRef}>
          <div
            className={`${
              authUser
                ? "flex items-center border p-2 rounded-full shadow-lg"
                : "hidden"
            }`}
          >
            <img src={authUser?.profilePhoto} alt="" className="h-6 w-6" />
          </div>

          {profile && (
            <div className="top-16 bg-white absolute border right-20 md:right-12 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg">
              <a href="/profile" className="hover:bg-gray-100 p-2">
                Profile
              </a>
              <button
                onClick={() => {
                  logout();
                }}
                className="hover:bg-gray-100 p-2 flex gap-2 items-center"
              >
                Logout
                <img src={logoutimg} alt="" className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div onClick={() => setOpen(!open)} ref={openRef} className="flex">
          <div
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
    </div>
  );
};

export default Navbar;
