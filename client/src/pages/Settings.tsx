"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Check, X } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import MainLayout from "@/layouts/Main"
import { makePayment } from "@/api/api"

// Define the input type for the form
type Inputs = {
    username: string
    email: string
    password: string
}

export default function Setting() {
    // Mock user and locale data (would come from your stores)
    const user = {
        username: "johndoe",
        email: "john@example.com",
        totalProduct: 5,
    }

    const locale = {
        settings: {
            title: "Settings",
            username: "Username",
            usernamePlaceholder: "Enter your username",
            email: "Email",
            emailPlaceholder: "Enter your email",
            password: "Password",
            passwordPlaceholder: "Enter your password",
            save: "Save",
        },
    }

    const [isAnnual, setIsAnnual] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            username: user.username,
            email: user.email,
            password: "",
        },
    })

    // Function to handle form submission
    const onSubmit = async (data: Inputs) => {
        setIsLoading(true)
        setApiError(null)

        try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Form submitted:", data)
            // Success toast would go here
        } catch (error) {
            setApiError("Failed to connect to the server. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    const handlePayment =  async (id) => {

        const x = navigator.language == 'fr' || window.localStorage.getItem("language") == 'fr'
        const { payment_url } = await makePayment({ packageId: id, lang: x ? 'french' : 'english', annual: isAnnual })

        if(payment_url) {
            window.location.assign(payment_url)
        }
    }

    return (
        <MainLayout>
            <main className="flex text-white flex-col justify-center mt-0 lg:mt-10 items-center col-span-12 p-4">
                {/* Settings Card */}
                <Card className="bg-[#0a081e] text-white p-5 w-full lg:w-1/2">
                    <CardContent>
                        <h3 className="text-center text-2xl font-bold">{locale.settings.title}</h3>
                        {isLoading ? (
                            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
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
                            </div>
                        ) : (
                            <form className="flex flex-col gap-6 p-3" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label>{locale.settings.username}</label>
                                    <Input
                                        className="bg-[#1a1830] border-[#2a2845] text-white"
                                        placeholder={locale.settings.usernamePlaceholder}
                                        defaultValue={user.username}
                                        {...register("username", { required: "Username is required" })}
                                    />
                                    {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                                </div>

                                <div>
                                    <label>{locale.settings.email}</label>
                                    <Input
                                        className="bg-[#1a1830] border-[#2a2845] text-white"
                                        type="email"
                                        placeholder={locale.settings.emailPlaceholder}
                                        defaultValue={user.email}
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                </div>

                                <div>
                                    <label>{locale.settings.password}</label>
                                    <Input
                                        className="bg-[#1a1830] border-[#2a2845] text-white"
                                        type="password"
                                        placeholder={locale.settings.passwordPlaceholder}
                                        defaultValue={""}
                                        {...register("password", { minLength: 8 })}
                                    />
                                    {errors.password && (
                                        <span className="text-red-500 text-sm">Password must be at least 8 characters</span>
                                    )}
                                </div>

                                <div className="flex flex-row items-center justify-center">
                                    <Button disabled={isLoading} className="px-8 bg-purple-600 hover:bg-purple-700">
                                        {isLoading ? "..." : locale.settings.save}
                                    </Button>
                                    {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Pricing Card */}



                <div className="flex-row items-center py-4 gap-4 flex justify-end">
                    <label>Annual </label>
                    <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-purple-600" />
                </div>

                {/* Pricing Plans */}
                <div className="mt-6">
                    <div className="flex justify-center space-x-2 mb-8">
                        <Button
                            variant={isAnnual ? "default" : "outline"}
                            className={isAnnual ? "bg-[#0a081e] text-white border border-white" : "bg-white text-[#0a081e]"}
                            onClick={() => setIsAnnual(false)}
                        >
                            Mensuel
                        </Button>
                        <Button
                            variant={!isAnnual ? "default" : "outline"}
                            className={!isAnnual ? "bg-[#0a081e] text-white border border-white" : "bg-white text-[#0a081e]"}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annuel
                        </Button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Débutant Plan */}
                        <div className="bg-[#13112b] rounded-lg p-6 flex flex-col">
                            <h3 className="text-xl font-bold text-center mb-2">DÉBUTANT</h3>
                            <p className="text-3xl font-bold text-center mb-4">{isAnnual ? "19€" : "29€"}/mois</p>

                            <div className="border-t border-b border-gray-700 py-4 my-4">
                                <p className="text-sm">5 Produits Textuels</p>
                                <p className="text-sm">0 Produit Visuel</p>
                            </div>

                            <div className="flex-grow space-y-2 mb-6">
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Description Produit</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Angles Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>FAQ</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Avis Clients</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Briefs Influenceurs</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Rédaction SAV</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Email Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Successful Rate</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Images sur-mesures</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handlePayment(1)}
                                disabled={user.totalProduct === 5}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                Basic
                            </Button>
                        </div>

                        {/* Avancé Plan */}
                        <div className="bg-[#13112b] rounded-lg p-6 flex flex-col border-2 border-purple-600 relative">
                            <h3 className="text-xl font-bold text-center mb-2">AVANCÉ</h3>
                            <p className="text-3xl font-bold text-center mb-4">{isAnnual ? "24€" : "39€"}/mois</p>

                            <div className="border-t border-b border-gray-700 py-4 my-4">
                                <p className="text-sm">15 Produits Textuels</p>
                                <p className="text-sm">5 Produits Visuels</p>
                            </div>

                            <div className="flex-grow space-y-2 mb-6">
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Description Produit</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Angles Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Avis Clients</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>FAQ</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Briefs Influenceurs</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Images sur-mesures</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Email Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Successful Rate</span>
                                </div>
                                <div className="flex items-start">
                                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400">Rédaction SAV</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handlePayment(2)}
                                disabled={user.totalProduct === 15}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                Advance
                            </Button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-[#13112b] rounded-lg p-6 flex flex-col">
                            <h3 className="text-xl font-bold text-center mb-2">PRO</h3>
                            <p className="text-3xl font-bold text-center mb-4">{isAnnual ? "39€" : "69€"}/mois</p>

                            <div className="border-t border-b border-gray-700 py-4 my-4">
                                <p className="text-sm">20 Produits Textuels</p>
                                <p className="text-sm">10 Produits Visuels</p>
                            </div>

                            <div className="flex-grow space-y-2 mb-6">
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Description Produit</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Angles Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Avis Clients</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>FAQ</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Briefs Influenceurs</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Rédaction SAV</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Email Marketing</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Successful Rate</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Images sur-mesures</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handlePayment(3)}
                                disabled={user.totalProduct === 20}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                Pro
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between mt-6">



                </div>

            </main>
        </MainLayout>
    )
}

