import google from "../assets/google.svg";
import email from "../assets/email.svg";
import mobile from "../assets/mobile.svg";
import skills from "../assets/skills.svg";

const ProfilePage = () => {
  return (
    <div className="mt-36 mb-36 sm:mb-0 overflow-hidden flex justify-center">
      <div className="h-full px-4 border mx-4 pb-4 flex flex-col items-center gap-4">
        <div className="m-4 p-2 flex justify-center">
          <img src={google} alt="" className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-2xl">Asim Munir Ramdurg</h1>

          <div className="flex gap-8 items-center">
            {" "}
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium">Recruiter</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <h1>Companies:</h1>
          Google, Microsoft, DigitalOcean
        </div>

        <div className="text-center text-sm">
          Bio:
          <p className="text-gray-600">
            I am a professional Web Developer from Maharashtra, India I am a
            professional Web Developer from Maharashtra, India I am a
            professional Web Developer from Maharashtra, India I am a
            professional Web Developer from Maharashtra, India I am a
            professional Web Developer from Maharashtra, India professional Web
            Developer from Maharashtra, India professional Web Developer from
            Maharashtra, India professional Web Developer from Maharashtra,
            India professional Web Developer from Maharashtra, India
            professional Web Developer from Maharashtra, India
          </p>
        </div>
        <div className="text-gray-700 flex gap-4">
          <p className="flex items-center gap-1">
            <img src={email} alt="email" className="h-4 w-4" />
            <span>asimramdurg12@gmail.com</span>
          </p>{" "}
          |
          <p className="flex items-center gap-1">
            <img src={mobile} alt="" className="h-4 w-4" />
            <span>+91-9921795713</span>
          </p>
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <img src={skills} alt="skills" className="h-4 w-4" />
          HTML, CSS, JS, React.JS, NEXT.JS, Node.JS
        </div>

        <div>
          <input type="file" name="resume" id="resume" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
