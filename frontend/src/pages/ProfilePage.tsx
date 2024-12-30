import email from "../assets/email.svg";
import mobile from "../assets/mobile.svg";
import skills from "../assets/skills.svg";
import useProfile from "../hooks/useProfile";
import dot from "../assets/dot.svg";
import menu from "../assets/menu.svg";
import { useEffect, useRef, useState } from "react";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(null);

  const { authUser } = useProfile();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      //@ts-expect-error e.target
      if (!openRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  console.log(authUser.role);

  return (
    <div className="mt-36 mb-36 sm:mb-0 flex justify-center">
      <div className="h-full px-4 border max-w-3xl md:mx-auto w-full rounded-xl shadow-lg mx-4 pb-4 flex flex-col items-center gap-4">
        <div className="mb-20 mt-5 w-full flex justify-center relative">
          <img
            src={authUser.profile.profilePhoto}
            alt=""
            className="h-20 w-20 rounded-full absolute"
          />

          <div className="absolute right-0" ref={openRef}>
            <img
              src={menu}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="bg-white absolute border hover:bg-gray-100 right-1 w-[140px] flex flex-col font-medium gap-2 rounded-lg shadow-lg">
                <a href="/profile/update">Update</a>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-2xl">{authUser.name}</h1>
          <p className="text-xs font-medium text-gray-500">
            {authUser.role.toUpperCase()}
          </p>
        </div>

        <div className="text-center text-sm">
          Bio:
          <p className="text-gray-600">
            {authUser.profile.bio === undefined ? "" : authUser.profile.bio}
          </p>
        </div>
        <div className="text-gray-700 flex gap-4">
          <p className="flex items-center gap-1">
            <img src={email} alt="email" className="h-4 w-4" />
            <span>{authUser.email}</span>
          </p>{" "}
          |
          <p className="flex items-center gap-1">
            <img src={mobile} alt="" className="h-4 w-4" />
            <span>+91-{authUser.mobile}</span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center text-gray-700">
          <img src={skills} alt="skills" className="h-4 w-4" />

          {authUser.profile.skills.map((skill: string) => (
            <div className="flex items-center">
              <img src={dot} alt="dot" className="h-4 w-4" />
              <p>{skill}</p>
            </div>
          ))}
        </div>

        <div>
          <input type="file" name="resume" id="resume" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
