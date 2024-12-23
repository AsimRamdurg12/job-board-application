import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.avif";
import twitter from "../assets/twitter.svg";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-orange-500 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-6">
        <div className="flex flex-col gap-4">
          <a href="/">Contact Us</a>
          <a href="/">About Us</a>
        </div>
        <div className="flex flex-col gap-4">
          <a href="/">Terms and Conditions</a>
          <a href="/">Privacy Policy</a>
        </div>
        <div className="flex gap-2">
          <img src={linkedin} alt="LinkedIn" className=" h-8 w-8" />
          <img src={instagram} alt="Instagram" className="h-8 w-8" />
          <img src={twitter} alt="Twitter/X" className="h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center mt-16 gap-4">
        <a href="/" className="text-2xl font-bold">
          Jobs.Me
        </a>
        <p>© 2024 Jobs.Me, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
