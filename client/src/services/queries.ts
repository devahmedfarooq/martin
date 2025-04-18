import { authUser, getProduct, imageGenrate, ImageGenrate } from "@/api/api";
import { useQuery, useMutation } from "@tanstack/react-query";


const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['Product', id],
        queryFn: () => getProduct(id)
    })
}

const useImageGenrate = () => {
    return useMutation({
        mutationKey: ['Image Genrate'],
        mutationFn: (img: ImageGenrate) => imageGenrate(img)
    })
}

const useAuth = () => {
    const token = window.localStorage.getItem("token");

    const { isLoading, isError, data, error, refetch,isPending } = useQuery({
        queryKey: ["auth-user"],
        queryFn: authUser,
        enabled: !!token, // Only enable if token exists
        refetchOnWindowFocus: true, // Optional: Disable automatic refetch on window focus
        refetchInterval : 100000
    });


    return {
        isLoading,
        isError,
        error,
        data,
        refetch,
        isAuthenticated: !!data?.user,
        isPending // Optional: Indicates if the user is authenticated
    };
};


export {
    useProduct,
    useAuth,
    useImageGenrate
}