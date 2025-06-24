import { useQuery } from "@tanstack/react-query"
import { get } from "../helpers/apiHelper"

export const useGetMovies = () => {
    return useQuery({
        queryKey: ['movies'],
        queryFn: () => {
            return get("/discover/movie?api_key=d5c1dd657edad479d46f03724b6e23e1&sort_by=popularity.desc")
        }
    })
}