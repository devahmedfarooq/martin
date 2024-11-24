import { authUser, getProduct } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['Product', id],
        queryFn: () => getProduct(id)
    })
}

const useAuth = () => {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: authUser,
        refetchOnMount : true,
        refetchInterval : 5000
    })
}


export {
    useProduct,
    useAuth
}