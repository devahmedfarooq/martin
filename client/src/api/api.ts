import axios from 'axios'
import loginSchema from '@/models/login'
import User from '@/types/user'
import { useToast } from '@/hooks/use-toast'
import { string } from 'zod'

export interface ImageGenrate {
    img: string,
    prompt: string,
    size: string,
    name: string
}

interface PaymentRequest {
    packageId: number;
    lang: string;
    annual: boolean;
}

interface PaymentResponse {
    payment_url: string;
    message: string
}


interface ResponseImageGenrate {
    img: string
}

interface ResponseAuth {
    user: User
}

interface ResponseLogin {
    token: string
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "authorization": String(window.localStorage.getItem("token"))
    }
})

const setupInterceptors = (toast: (args: { title: string; description: string }) => void) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                toast({ title: "🚨 Action Failed!", description: `Error: ${error.response.data.message || "Something went wrong"}` });
            } else if (error.request) {
                toast({ title: "⚠️ Network Issue", description: "No response received from the server. Please check your connection." });
            } else {
                toast({ title: "❌ Unexpected Error", description: error.message });
            }
            return Promise.reject(error);
        }
    );
}

const getProduct = async (id: string) => {
    return (await axiosInstance.get(`products/get-product?id=${id}`)).data
}

const authUser = async () => {
    return (await axiosInstance.get<ResponseAuth>("auth")).data
}

const imageGenrate = async (image: ImageGenrate) => {
    return (await axiosInstance.post<ResponseImageGenrate>("products/product-image",
        image
    )).data
}


const loginUser = async (body: loginSchema) => {
    return (await axiosInstance.post<ResponseLogin>("auth/login", body)).data
}


const makePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    return (await axiosInstance.post<PaymentResponse>("/payment", paymentData)).data;
};



export { getProduct, authUser, imageGenrate, loginUser, setupInterceptors, makePayment }