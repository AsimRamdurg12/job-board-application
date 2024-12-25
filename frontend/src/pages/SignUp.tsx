import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

  const handleSignup = async (data: SignupFormInputs) => {
    console.log(data);
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
                type="text"
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
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                {...register("password")}
                className="border px-4 py-2 rounded-xl w-72 sm:w-80 outline-blue-500 shadow-md"
              />
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
          <Link to="/login">
            <button
              type="submit"
              className="py-2 px-6 border rounded-lg bg-orange-500 text-xl font-medium text-white"
            >
              Signup
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
