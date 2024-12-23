import { useState } from "react";
import open from "../assets/open.svg";
import close from "../assets/close.svg";
import FAQimg from "../assets/FAQ.png";

interface FAQ {
  title: string;
  description: string;
}

const Accordion = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
      <img src={FAQimg} alt="FAQ" className="object-contain h-full w-full" />
      <div className=" mx-4 my-10 p-4 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">FAQ</h1>
        <FAQ
          title={"Is my data secure on this website?"}
          description={
            "Yes, we take data security seriously. All your personal information and documents are encrypted and stored securely. We comply with data protection regulations and never share your information without your consent."
          }
        />
        <FAQ
          title={"Can I use this for both jobs and internships?"}
          description={
            "Yes! we support applications for both full-time positions and internships. Our platform adapts the application process based on the type of opportunity you're pursuing."
          }
        />
        <FAQ
          title={"How quickly can I start applying for jobs?"}
          description={
            "You can start applying for jobs immediately after creating your account and uploading your CV."
          }
        />
      </div>
    </div>
  );
};

const FAQ = ({ title, description }: FAQ) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <div className="px-2 py-4 rounded-lg bg-white shadow-lg">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span className="text-xl">{title}</span>
        {accordionOpen ? (
          <img
            src={close}
            alt="-"
            className="w-6 h-6 transition-all ease-in-out duration-300"
          />
        ) : (
          <img
            src={open}
            alt="+"
            className="w-6 h-6 transition-all ease-in-out duration-300"
          />
        )}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-lg ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{description}</div>
      </div>
    </div>
  );
};

export default Accordion;
