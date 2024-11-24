import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/Main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from '@/zutstand/store/user'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/services/queries";
import useLocale from "@/zutstand/store/locale";


// Define the input type for the form
type Inputs = {
    username: string,
    email: string,
    password: string
}

export default function Setting() {
    const { user, setUser } = useUser();
    const { locale } = useLocale()
    const { data } = useAuth()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: {
            username: user.username,
            email: user.email,
            password: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Function to handle form submission
    const onSubmit = async (data: Inputs) => {
        setIsLoading(true);
        setApiError(null); // Reset API errors

        try {
            const res = await fetch("http://localhost:4000/auth/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": String(window.localStorage.getItem("token"))
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log("USER ", responseData);
                setUser({
                    ...user,
                    username: responseData.user.username,
                    email: responseData.user.email
                }); // Update the user state
                toast({
                    title: "Settings Saved!",
                    description: "Settings have been updated."
                })
                reset(); // Reset the form to its initial state
            } else {
                const errorData = await res.json();
                setApiError(errorData.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setApiError("Failed to connect to the server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <main className="flex text-white flex-row justify-center mt-48 lg:mt-0 items-center col-span-12 p-4">
                <Card className="bg-[#0a081e] text-white p-5 w-full lg:w-1/2">
                    <CardContent>
                        <h3 className="text-center text-2xl font-bold">{locale.settings.title}</h3>
                        {isLoading ? <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                            <svg
                                className="text-gray-300 animate-spin"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                            >
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80101 17.3837 6.66488 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor"
                                    strokeWidth={4}
                                />
                            </svg>
                        </div> : <form className="flex flex-col gap-6 p-3" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label>{locale.settings.username}</label>
                                <Input
                                    className=""
                                    placeholder={locale.settings.usernamePlaceholder}
                                    defaultValue={user.username}
                                    {...register("username", { required: "Username is required" })}
                                />
                                <span>{errors.username?.message}</span>
                            </div>

                            <div>
                                <label>{locale.settings.email}</label>
                                <Input
                                    className=""
                                    type="email"
                                    placeholder={locale.settings.emailPlaceholder}
                                    defaultValue={user.email}
                                    {...register("email", { required: "Email is required" })}
                                />
                                <span>{errors.email?.message}</span>
                            </div>
                            <div>
                                <label>{locale.settings.password}</label>
                                <Input
                                    className=""
                                    type="password"
                                    placeholder={locale.settings.passwordPlaceholder}
                                    defaultValue={''}
                                    {...register("password", { minLength: 8 })}
                                />
                                <span>{errors.password?.message}</span>
                            </div>

                            <div>
                                <Button disabled={isLoading} className="px-8">
                                    {isLoading ? "..." : locale.settings.save}
                                </Button>
                                {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
                            </div>
                        </form>}
                    </CardContent>
                </Card>
            </main>
        </MainLayout >
    );
}
