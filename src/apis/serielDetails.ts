import { useQuery } from "@tanstack/react-query"
import { get } from "../helpers/apiHelper"

export const useGetSerialById = (id:any) => {
    return useQuery({
        queryKey: ['serial-detail', id],
        queryFn: () => {
            return get(`/tv/${id}?api_key=d5c1dd657edad479d46f03724b6e23e1&sort_by=popularity.desc`)
        }
    })
}
