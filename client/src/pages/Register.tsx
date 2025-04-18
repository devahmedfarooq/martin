import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
    FormDescription
} from "@/components/ui/form";
import AuthLayout from "@/layouts/Auth";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "@/models/register"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Progress } from "@/components/ui/progress"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Loading {
    value: number,
    state: boolean
}

export default function RegisterPage() {
    const { toast } = useToast()
    const [loading, setLoading] = useState<Loading>({
        value: 0,
        state: false
    })
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        },
    })

    const mobile_form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading({ ...loading, state: true, value: 21 })
        const body = values; // Use the values passed to the onSubmit function
        setLoading({ ...loading, value: 65 });
        const res = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()

        setLoading({ ...loading, value: 100 })

        if (!res.ok) {
            toast({
                title: "Error While Registering",
                description: data.message
            })
        }

        if (res.ok) {
            navigate("/auth/login")
        }
    }

    return (
        <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">
            <div className="flex flex-row w-full justify-center items-center">
                <div className="px-16 hidden lg:flex min-w-[700px] flex-col gap-4">
                    <div className="mb-2">
                        <h1 className="text-7xl font-bold">Welcome</h1>
                        <h3 className="text-[16px] my-1">Please Enter Your Credentials</h3>
                    </div>

                    <div className="my-1">
                        <Form {...form}> {/* Wrap the form with Form provider */}
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please Enter Your Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please Enter Your Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Please Enter Your Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-row justify-center items-center">
                                    <Button type="submit" className="bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-md text-lg w-9/12">
                                        Register
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

                <div className="px-8 pt-8 bg-white lg:hidden flex flex-col gap-4 w-full">
                    <div className="mb-2">
                        <h1 className="text-4xl font-bold">Welcome</h1>
                        <h3 className="text-base my-1">Please Enter Your Credentials</h3>
                    </div>

                    <div className="my-1">
                        <Form {...mobile_form}> {/* Wrap the form with Form provider */}
                            <form onSubmit={mobile_form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={mobile_form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please Enter Your Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={mobile_form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Please Enter Your Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={mobile_form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Please Enter Your Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex flex-row justify-center items-center">
                                    <Button type="submit" className="bg-[#020013] cursor-pointer hover:shadow-sm hover:shadow-[#020013] transition-shadow text-white px-8 py-3 rounded-lg text-sm w-10/12">
                                        Register
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}