import { useQuery } from "@tanstack/react-query"
import { get } from "../helpers/apiHelper"

export const useGetSeries = () => {
    return useQuery({
        queryKey: ['series'],
        queryFn: () => {
            return get("/discover/tv?api_key=d5c1dd657edad479d46f03724b6e23e1&sort_by=popularity.desc")
        }
    })
}