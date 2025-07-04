"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import AuthLayout from "@/layouts/Auth"
import { useToast } from "@/hooks/use-toast"

// Form schema
const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type FormValues = z.infer<typeof formSchema>

interface Loading {
  value: number
  state: boolean
}

export default function RegisterPage() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<Loading>({
    value: 0,
    state: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  // Desktop form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })

  // Mobile form setup
  const mobileForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })

  // Form submission handler
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading({ state: true, value: 21 })

    try {
      // Simulate API call progress
      setLoading({ state: true, value: 65 })

      const res = await fetch("https://server-delicate-glade-3069.fly.dev/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      setLoading({ state: false, value: 100 })

      if (!res.ok) {
        toast({
          title: "Error While Registering",
          description: data.message,
        })
        return
      }

      toast({
        title: "Registration Successful",
        description: "You can now login to your account",
      })

      navigate("/auth/login")
    } catch (error: any) {
      setLoading({ state: false, value: 0 })
      toast({
        title: "Error While Registering",
        description: error.message || "Something went wrong",
      })
    }
  }

  return (
    <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">
      <div className="flex flex-row w-full justify-center items-center">
        {/* Desktop View */}
        <div className="px-16 hidden lg:flex min-w-[700px] flex-col gap-4">
          <div className="mb-2">
            <h1 className="text-7xl font-bold">Welcome</h1>
            <h3 className="text-[16px] my-1">Please Enter Your Credentials</h3>
          </div>

          <div className="my-1">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Username Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <div className="border-2 rounded-2xl px-2 py-3 border-solid border-[#818181]">
                  <input
                    id="username"
                    {...form.register("username")}
                    placeholder="Please Enter Your Username"
                    className="w-full px-2 text-lg outline-none border-none"
                  />
                </div>
                <p className="text-red-500 text-sm">{form.formState.errors.username?.message}</p>
              </div>

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

              {/* Submit Button */}
              <div className="flex flex-row justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-md text-lg w-9/12 flex justify-center items-center gap-2 ${
                    loading.state ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading.state}
                >
                  {loading.state ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="flex justify-center mt-2">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="font-medium text-[#020013] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile View */}
        <div className="px-8 pt-8 bg-white lg:hidden flex flex-col gap-4 w-full">
          <div className="mb-2">
            <h1 className="text-4xl font-bold">Welcome</h1>
            <h3 className="text-base my-1">Please Enter Your Credentials</h3>
          </div>

          <div className="my-1">
            <form onSubmit={mobileForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Username Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Username</label>
                <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400">
                  <input
                    {...mobileForm.register("username")}
                    placeholder="Please Enter Your Username"
                    className="w-full px-2 text-sm outline-none border-none"
                  />
                </div>
                <p className="text-red-500 text-xs">{mobileForm.formState.errors.username?.message}</p>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Email</label>
                <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400">
                  <input
                    {...mobileForm.register("email")}
                    type="email"
                    placeholder="Please Enter Your Email"
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Please Enter Your Password"
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

              {/* Submit Button */}
              <div className="flex flex-row justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-lg text-sm w-10/12 flex justify-center items-center gap-2 ${
                    loading.state ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading.state}
                >
                  {loading.state ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="flex justify-center mt-2">
                <p className="text-xs">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="font-medium text-[#020013] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
