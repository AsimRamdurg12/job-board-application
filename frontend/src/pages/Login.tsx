import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await axios.post("api/auth/login", {
        email: data.email,
        password: data.password,
        role: data.role,
      });

      const result = await response.data;
      console.log(result);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        // Handle user exists error based on status code or error message
        if (err.response?.status === 404) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 401) {
          toast.error(err.response?.data.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
    onSuccess: () => {
      toast.success("Logged in Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      navigate("/");
    },
  });

  const handleLogin = async (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <section className="mt-36 flex justify-center">
      <div className="h-full pb-8 w-full sm:w-fit flex flex-col sm:px-24 border shadow-lg bg-white mx-4 rounded-xl">
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
                className="border px-4 py-2 rounded-xl outline-blue-500 w-72 sm:w-80 shadow-md"
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
                className="border px-4 py-2 rounded-xl outline-blue-500 w-72 sm:w-80 shadow-md"
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
                className="border px-4 py-2 rounded-xl outline-blue-500 w-72 sm:w-80 shadow-md"
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
            {isPending ? "Logging in" : "Login"}
          </button>
          {isError && errors.root?.message}
        </form>
      </div>
    </section>
  );
};

export default Login;