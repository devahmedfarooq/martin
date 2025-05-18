"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Check, X, Loader2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import MainLayout from "@/layouts/Main"
import { makePayment } from "@/api/api"
import useUser from "@/zutstand/store/user"
import useLocale from "@/zutstand/store/locale"
import English from '@/locales/en.json'

// Define the input type for the form
type Inputs = {
  username: String
  email: String
  password: String
}

export default function Setting() {
  const { user } = useUser()
  const {locale}  = useLocale() 
  // Pricing data with translations


  const [isAnnual, setIsAnnual] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        password: "",
      })
    }
  }, [user, reset])

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

  const handlePayment = async (id: number) => {
    try {
      const x = navigator.language === "fr" || window.localStorage.getItem("language") === "fr"
      const { payment_url } = await makePayment({
        packageId: id,
        lang: x ? "french" : "english",
        annual: isAnnual,
      })

      if (payment_url) {
        window.location.assign(payment_url)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setApiError("Failed to process payment. Please try again later.")
    }
  }


  const pricingData = [
    {
      title: locale === English ? "BEGINNER" : "DÉBUTANT",
      price: isAnnual ? "19€" : "29€",
      textProducts: 5,
      visualProducts: 0,
      features: [
        { name: locale.app.description, included: true },
        { name: locale.app.marketing_angle, included: true },
        { name: locale.app.faqs, included: true },
        { name: locale.app.reviews, included: true },
        { name: locale.app.influencer_breif, included: false },
        { name: locale.app.after_sale, included: false },
        { name: locale.app.email_marketing, included: false },
        { name: locale.app.successfull_rate, included: false },
        { name: locale.app.images, included: false },
      ],
      buttonText: "Basic",
      packageId: 1,
      disabled: user?.totalProduct === 5,
    },
    {
      title: locale === English ? "ADVANCED" : "AVANCÉ",
      price: isAnnual ? "24€" : "39€",
      textProducts: 15,
      visualProducts: 5,
      features: [
        { name: locale.app.description, included: true },
        { name: locale.app.marketing_angle, included: true },
        { name: locale.app.reviews, included: true },
        { name: locale.app.faqs, included: true },
        { name: locale.app.influencer_breif, included: true },
        { name: locale.app.images, included: true },
        { name: locale.app.email_marketing, included: false },
        { name: locale.app.successfull_rate, included: false },
        { name: locale.app.after_sale, included: false },
      ],
      buttonText: "Advance",
      packageId: 2,
      disabled: user?.totalProduct === 15,
      highlighted: true,
    },
    {
      title: "PRO",
      price: isAnnual ? "39€" : "69€",
      textProducts: 20,
      visualProducts: 10,
      features: [
        { name: locale.app.description, included: true },
        { name: locale.app.marketing_angle, included: true },
        { name: locale.app.reviews, included: true },
        { name: locale.app.faqs, included: true },
        { name: locale.app.influencer_breif, included: true },
        { name: locale.app.after_sale, included: true },
        { name: locale.app.email_marketing, included: true },
        { name: locale.app.successfull_rate, included: true },
        { name: locale.app.images, included: true },
      ],
      buttonText: "Pro",
      packageId: 3,
      disabled: user?.totalProduct === 20,
    },
  ]

  return (
    <MainLayout>
      <main className="flex text-white flex-col justify-center mt-0 lg:mt-10 items-center col-span-12 p-4">
        {/* Language Switcher */}
       

        {/* Settings Card */}
        <Card className="bg-[#0a081e] text-white p-5 w-full lg:w-1/2">
          <CardContent>
            <h3 className="text-center text-2xl font-bold">{locale.settings.title}</h3>
            {isLoading ? (
              <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <Loader2 className="h-8 w-8 text-gray-300 animate-spin" />
              </div>
            ) : (
              <form className="flex flex-col gap-6 p-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>{locale.settings.username}</label>
                  <Input
                    className="bg-[#1a1830] border-[#2a2845] text-white"
                    placeholder={locale.settings.usernamePlaceholder}
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
                    {...register("password", { minLength: 8 })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">Password must be at least 8 characters</span>
                  )}
                </div>

                <div className="flex flex-row items-center justify-center">
                  <Button type="submit" disabled={isLoading} className="px-8 bg-purple-600 hover:bg-purple-700">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      locale.settings.save
                    )}
                  </Button>
                </div>
                {apiError && <p className="text-red-500 mt-2 text-center">{apiError}</p>}
              </form>
            )}
          </CardContent>
        </Card>

        {/* Pricing Section */}
        <div className="w-full mt-8">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <span className={!isAnnual ? "font-bold" : "text-gray-400"}>
                {locale === English ? "Monthly" : "Mensuel"}
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-purple-600" />
              <span className={isAnnual ? "font-bold" : "text-gray-400"}>
                {locale === English ? "Annual" : "Annuel"}
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-md">
              {pricingData.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-[#13112b] rounded-lg p-6 flex flex-col ${
                    plan.highlighted ? "border-2 border-purple-600 relative" : ""
                  }`}
                >
                  <h3 className="text-xl font-bold text-center mb-2">{plan.title}</h3>
                  <p className="text-3xl font-bold text-center mb-4">
                    {plan.price}
                    {locale === English ? "/month" : "/mois"}
                  </p>

                  <div className="border-t border-b border-gray-700 py-4 my-4">
                    <p className="text-sm">
                      {plan.textProducts} {locale === English ? "Textual Products" : "Produits Textuels"}
                    </p>
                    <p className="text-sm">
                      {plan.visualProducts}{" "}
                      {locale === English
                        ? plan.visualProducts === 1
                          ? "Visual Product"
                          : "Visual Products"
                        : plan.visualProducts === 1
                          ? "Produit Visuel"
                          : "Produits Visuels"}
                    </p>
                  </div>

                  <div className="flex-grow space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handlePayment(plan.packageId)}
                    disabled={plan.disabled}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

