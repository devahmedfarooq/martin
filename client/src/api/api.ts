import axios from 'axios'

import User from '@/types/user'

interface ResponseAuth {
    user : User
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "authorization": String(window.localStorage.getItem("token"))
    }
})


const getProduct = async (id: string) => {
    return (await axiosInstance.get(`products/get-product?id=${id}`)).data
}

const authUser = async () => {
    return (await axiosInstance.get<ResponseAuth>("auth")).data
}

export { getProduct, authUser }