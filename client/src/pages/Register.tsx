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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoading({ ...loading, state: true, value: 21 })
        const body = form.getValues()
        setLoading({ ...loading, value: 65 });
        const res = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }

        })
        const data = await res.json()

        setLoading({ ...loading, value: 100 })
        //   setLoading({...loading,state:false})

        if (!res.ok) {
            toast({
                title: "Error While Registering",
                description : data.message
            })
        }

        if(res.ok) {
            navigate("/auth/login")
        }
    }

    return <AuthLayout classname="flex p-4 justify-center flex-col gap-y-4">
        <>



            <Card>
                <CardHeader>Create an account</CardHeader>
                <CardContent>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 flex flex-col">


                            <FormField control={form.control} name="username" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />


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
                        <p className="my-2">already have an account? <strong onClick={() => navigate("/auth/login")} className="cursor-pointer ">Login</strong></p>
                    </div>
                </CardContent>
            </Card>

        </>
    </AuthLayout>
}