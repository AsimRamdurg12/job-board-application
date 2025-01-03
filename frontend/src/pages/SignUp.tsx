import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import openeye from "../assets/openeye.svg";
import closeeye from "../assets/closeeye.svg";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3).max(100, "Please enter your full name"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be 10 digits"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  role: z.enum(["recruiter", "employee"], {
    message: "Please Select Role",
  }),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: undefined,
    },
    resolver: zodResolver(signupSchema),
  });

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (data: SignupFormInputs) => {
      const res = await axios.post("/api/auth/signup", {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        role: data.role,
      });
      const result = await res.data;
      return result;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        // Handle user exists error based on status code or error message
        if (err.response?.status === 409) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 403) {
          toast.error(err.response?.data.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
    onSuccess: () => {
      toast.success("Signup Completed successfully");
      navigate("/login");
    },
  });

  const handleSignup = async (data: SignupFormInputs) => {
    signup(data);
  };

  return (
    <section className="mt-24 flex justify-center">
      <div className="h-full pb-8 w-full sm:w-fit sm:px-24 flex flex-col border shadow-lg bg-white mx-4 rounded-xl">
        <h1 className="text-center my-5 text-3xl font-bold text-blue-600">
          Signup
        </h1>

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div className="flex flex-col gap-3">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                {...register("name")}
                className="border px-4 py-2 rounded-xl w-72 sm:w-80 outline-blue-500 shadow-md"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="someone@example.com"
                {...register("email")}
                className="border px-4 py-2 w-72 sm:w-80 rounded-xl outline-blue-500 shadow-md"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            {/* Mobile */}
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile" className="font-medium">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter Mobile no."
                {...register("mobile")}
                className="border px-4 py-2 rounded-xl w-72 sm:w-80 outline-blue-500 shadow-md"
              />
              {errors.mobile && (
                <p className="text-red-500">Please enter mobile no.</p>
              )}
            </div>
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div className="flex justify-between border py-2 rounded-xl outline-blue-500 w-72 sm:w-80 shadow-md">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password"
                  {...register("password")}
                  className="w-80 rounded-md px-4 outline-none"
                />
                <img
                  src={show ? closeeye : openeye}
                  alt=""
                  onClick={handleShow}
                  className="h-6 w-6 mr-1"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}

            <div className="flex flex-col gap-2 ">
              <label className="font-medium">Role</label>
              <select
                {...register("role")}
                className="border px-4 py-2 rounded-xl w-72 sm:w-80 outline-blue-500 shadow-md"
              >
                <option>Select...</option>
                <option value="recruiter">Recruiter</option>
                <option value="employee">Employee</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>
          {/* Submit Button */}

          <button
            type="submit"
            className="py-2 px-6 border rounded-lg bg-orange-500 text-xl font-medium text-white"
          >
            {isPending ? "Signing in" : "SignUp"}
          </button>
          {isError && <p className="text-red-500">User already exists</p>}
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          already have an account?{" "}
          <a href="/login" className="underline">
            login
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
