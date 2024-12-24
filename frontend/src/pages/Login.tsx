import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  role: z.enum(["recruiter", "employee"], {
    message: "Please Select Role",
  }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "", role: undefined },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email: data.email,
      password: data.password,
      role: data.role,
    });

    const jwt = response.data.token;
    localStorage.setItem("jwt", jwt);
    console.log(response);
  };

  return (
    <section className="mt-36 flex justify-center">
      <div className="h-full pb-8 w-fit flex flex-col px-8 sm:px-16 md:px-24 border shadow-lg bg-white mx-4 rounded-xl">
        <h1 className="text-center my-5 text-3xl font-bold text-blue-600">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div className="flex flex-col gap-3">
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
                className="border px-4 py-2 rounded-xl outline-none shadow-md"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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
                className="border px-4 py-2 rounded-xl outline-none shadow-md"
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
                className="border px-4 py-2 rounded-xl outline-none shadow-md"
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
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
