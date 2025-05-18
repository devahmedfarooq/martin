import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/layouts/Auth";
import { loginUser } from "@/api/api";
import { useLocalStorage } from "@uidotdev/usehooks";
import { queryClient } from "@/main";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [savedToken, setToken] = useLocalStorage("token");
  const [showPassword, setShowPassword] = useState(false);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["User Login"],
  });

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Mobile form setup (for responsive design)
  const mobileForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form submission handler
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Extract rememberMe and pass the rest to the API
    const { rememberMe, ...loginData } = data;
    
    loginMutation.mutate(loginData, {
      onSuccess: ({ token }) => {
        setToken("Bearer " + token);
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        navigate("/");
      },
      onError: (error) => {
        toast({ title: "Error", description: error.message });
      },
    });
  };

  return (
    <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">
      <div className="flex flex-row w-full justify-center items-center">
        {/* Desktop View */}
        <div className="px-16 hidden lg:flex min-w-[700px] flex-col gap-4">
          <div className="mb-2">
            <h1 className="text-7xl font-bold">Welcome Back</h1>
            <h3 className="text-[16px] my-1">Please Enter Your Credentials</h3>
          </div>

          <div className="my-1">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <div className="border-2 rounded-2xl px-2 py-3 border-solid border-[#818181]">
                  <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="Please Enter Your Email"
                    className="w-full px-2 text-lg outline-none border-none"
                  />
                </div>
                <p className="text-red-500 text-sm">{form.formState.errors.email?.message}</p>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <div className="border-2 rounded-2xl px-2 py-3 border-solid border-[#818181] relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    placeholder="Please Enter Your Password"
                    className="w-full px-2 text-lg outline-none border-none pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-red-500 text-sm">{form.formState.errors.password?.message}</p>
              </div>

              {/* Additional Options */}
              <div className="flex flex-row items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    className="w-4 h-4"
                    {...form.register("rememberMe")} 
                  />
                  <label htmlFor="rememberMe" className="text-lg">
                    Remember for 30 days
                  </label>
                </div>
                <Link to="/auth/register" className="text-lg underline">
                  Register
                </Link>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#020013] text-white px-8 py-3 rounded-md text-lg w-9/12 transition-shadow flex justify-center items-center gap-2 ${
                    loginMutation.isPending ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm"
                  }`}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile View */}
        <div className="px-8 pt-8 bg-white lg:hidden flex flex-col gap-4 w-full">
          <div className="mb-2">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <h3 className="text-base my-1">Please Enter Your Credentials</h3>
          </div>

          <div className="my-1">
            <form
              onSubmit={mobileForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Email</label>
                <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400 relative">
                  <input
                    {...mobileForm.register("email")}
                    placeholder="Please Enter Your Email"
                    type="email"
                    className="w-full px-2 text-sm outline-none border-none"
                  />
                </div>
                <p className="text-red-500 text-xs">{mobileForm.formState.errors.email?.message}</p>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Password</label>
                <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400 relative">
                  <input
                    {...mobileForm.register("password")}
                    placeholder="Please Enter Your Password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-2 text-sm outline-none border-none pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-red-500 text-xs">{mobileForm.formState.errors.password?.message}</p>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-row gap-2 items-center justify-between mt-2">
                <div className="flex flex-row items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="mobileRememberMe" 
                    className="w-4 h-4"
                    {...mobileForm.register("rememberMe")} 
                  />
                  <label htmlFor="mobileRememberMe" className="text-xs">
                    Remember for 30 days
                  </label>
                </div>
                <div>
                  <Link to="/auth/forgot-password" className="text-xs underline">
                    Forgot Password
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-row justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#020013] text-white px-8 py-3 rounded-lg text-sm w-10/12 transition-all flex justify-center items-center gap-2 ${
                    loginMutation.isPending ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                  }`}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
