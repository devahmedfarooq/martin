
import AuthLayout from "@/layouts/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast"
import formSchema from "@/models/login";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/api";
import { useLocalStorage } from '@uidotdev/usehooks'
import { queryClient } from "@/main";

interface Loading {
    value: number,
    state: boolean
}



export default function LoginPage() {
    const { toast } = useToast()
    const [savedToken, setToken] = useLocalStorage("token")
    const [loading, setLoading] = useState<Loading>({
        value: 0,
        state: false
    })


    const loginMutation = useMutation({
        mutationFn: loginUser,
        mutationKey: ["User Login"]
    })


    const { register, handleSubmit, formState: { errors } } = useForm<formSchema>()
    const { register: registerMobile, handleSubmit: handleMobileSubmit, formState: { errors: errorsMobile } } = useForm<formSchema>()


    const navigate = useNavigate();




    const onSubmit: SubmitHandler<formSchema> = (data) => {
        setLoading({ state: true, value: 0 });
        loginMutation.mutate(data, {
            onSuccess: ({ token }) => {
                setLoading({ state: false, value: 100 });
                setToken('Bearer ' + token)
                queryClient.invalidateQueries({queryKey : ["auth-user"]})
                navigate("/");
            },
            onError: (error) => {
                setLoading({ state: false, value: 0 });
                toast({ title: "Error", description: error.message });
            },
        });
    };
    

    return <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">


        <div className="flex flex-row w-full justify-center items-center">




            <div className="px-16 hidden lg:flex min-w-[700px]  flex-col gap-4" >
                <div className="mb-2">
                    <h1 className="text-7xl font-bold">Welcome Back</h1>
                    <h3 className="text-[16px] my-1">Please Enter Your Credentials</h3>
                </div>

                <div className="my-1">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {/* Email Field */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-lg">
                                Email
                            </label>
                            <div className="border-2 rounded-2xl px-2 py-3 border-solid border-[#818181]">
                                <input
                                    id="email"
                                    {...register("email")}
                                    placeholder="Please Enter Your Email"
                                    className="w-full px-2 text-lg outline-none border-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-lg">
                                Password
                            </label>
                            <div className="border-2 rounded-2xl px-2 py-3 border-solid border-[#818181]">
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                    placeholder="Please Enter Your Password"
                                    className="w-full px-2 text-lg outline-none border-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{errors.password?.message}</p>
                        </div>

                        {/* Additional Options */}
                        <div className="flex flex-row items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="w-4 h-4" />
                                <label htmlFor="remember" className="text-lg">
                                    Remember for 30 days
                                </label>
                            </div>
                            <a href="/auth/register" className="text-lg underline">
                                Register
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className={`bg-[#020013] text-white px-8 py-3 rounded-md text-lg w-9/12 transition-shadow ${loading.state ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm"
                                    }`}
                                disabled={loading.state}
                            >
                                {loading.state ? "Signing in..." : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>




            <div className="px-8 pt-8 bg-white lg:hidden flex flex-col gap-4 w-full" >
                <div className="mb-2">
                    <h1 className="text-4xl font-bold">Welcome Back</h1>
                    <h3 className="text-base my-1">Please Enter Your Credentials</h3>
                </div>

                <div className="my-1">
                    <form
                        onSubmit={handleMobileSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        {/* Email Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Email</label>
                            <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400">
                                <input
                                    {...registerMobile("email", { required: "Email is Required" })}
                                    placeholder="Please Enter Your Email"
                                    className="w-full px-2 text-sm outline-none border-none"
                                />
                            </div>
                            <p className="text-red-500 text-xs">{errorsMobile.email?.message}</p>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm">Password</label>
                            <div className="border-2 rounded-xl px-2 py-3 border-solid border-gray-400">
                                <input
                                    {...registerMobile("password", {
                                        required: "Password is Required",
                                    })}
                                    placeholder="Please Enter Your Password"
                                    type="password"
                                    className="w-full px-2 text-sm outline-none border-none"
                                />
                            </div>
                            <p className="text-red-500 text-xs">{errorsMobile.password?.message}</p>
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex flex-row gap-2 items-center justify-between mt-2">
                            <div className="flex flex-row items-center gap-2">
                                <div className="p-3 hover:bg-black border-2 border-black border-solid rounded">
                                    {/* Add checkbox functionality if needed */}
                                </div>
                                <p className="text-xs">Remember for 30 days</p>
                            </div>
                            <div>
                                <a href="#" className="text-xs underline">
                                    Forgot Password
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-row justify-center items-center">
                            <input
                                className="bg-black cursor-pointer hover:shadow-lg text-white px-8 py-3 rounded-lg text-sm w-10/12 transition-all"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                    </form>
                </div>

            </div>








        </div>
    </AuthLayout>
}









/* 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    }) */

/*     async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
 
        try {
 
 
 
            setLoading({ ...loading, state: true, value: 21 })
            const body = form.getValues()
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
 
            })
 
            const data = await res.json()
 
            //      console.log("LOGIN DATA:59 = ", data)
            setLoading({ ...loading, value: 100 })
            if (res.ok) {
                window.localStorage.setItem("token", data?.token)
                setTimeout(() => {
 
                }, 2000)
                if (window.localStorage.getItem("token")) {
                    navigate("/")
                } else {
                    window.localStorage.setItem("token", data?.token)
                    navigate("/")
                }
            }
 
            if (!res.ok) {
                toast({
                    title: "Error While Login!",
                    description: await data.message
                })
            }
 
 
        } catch (error) {
            toast({
                title: "Error While Login!",
                description: error?.message
            })
        }
 
 
        //   setLoading({...loading,state:false})
 
    } */




{/*             <Card>
                <CardHeader>Login to your account</CardHeader>
                <CardContent>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 flex flex-col">
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            {
                                loading.state ? <Progress value={loading.value} /> : null
                            }


                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <div className="flex flex-row justify-end items-center">
                        <p className="my-2">Don't have an account? <strong onClick={() => navigate("/auth/register")} className="cursor-pointer ">Register</strong></p>
                    </div>
                </CardContent>
            </Card> */}