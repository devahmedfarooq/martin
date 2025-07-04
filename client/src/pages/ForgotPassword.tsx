
import AuthLayout from "@/layouts/Auth";



export default function ForgotPasswordPage() {
/*     const { toast } = useToast()
 */   



/*     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        try {



            setLoading({ ...loading, state: true, value: 21 })
            const body = form.getValues()
            const res = await fetch("https://server-delicate-glade-3069.fly.dev/auth/login", {
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

    }
 */
    return <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">
        <div className="flex flex-row w-full justify-center items-center">




            <div className="px-16 hidden lg:flex min-w-[700px]  flex-col gap-4" >
                <div className="mb-2">
                    <h1 className="text-7xl font-bold">Welcome Back</h1>
                    <h3 className="text-[16px] my-1">Please Enter Your New Password</h3>
                </div>

                <div className="my-1">
                    <form className="flex flex-col gap-4">





                        <div className="flex flex-col gap-1">
                            <label className="text-lg ">Password</label>
                            <div className=" border-2 rounded-2xl px-2 py-3 border-solid border-[#818181]">
                                <input placeholder="Please Enter Your Password" className="w-full px-2 text-lg outline-none border-none" />
                            </div>
                        </div>






                        <div className="flex flex-row justify-center  items-center">
                            <input className="bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-md text-lg w-9/12" type="submit" value={"Change"} />
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
                    <form className="flex flex-col gap-4">


                        <div className="flex flex-col gap-1">
                            <label className="text-sm ">Password</label>
                            <div className=" border-2 rounded-xl px-2 py-3 border-solid border-[#818181]">
                                <input placeholder="Please Enter Your Password" className="w-full px-2 text-sm outline-none border-none" />
                            </div>
                        </div>






                        <div className="flex flex-row justify-center  items-center">
                            <input className="bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-lg text-sm w-10/12" type="submit" value={"Change Password"} />
                        </div>






                    </form>
                </div>

            </div>






            {/*            
             <Card>
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
            </Card> 
            */}

        </div>
    </AuthLayout>
}