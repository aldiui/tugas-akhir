import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminNegaraCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/negara', body)
}
export const adminNegaraUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/negara/${id}`, body)
}

export const adminNegaraDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/negara/${id}`)
}

export const adminNegaraGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/negara', { params })
}
export const adminNegaraGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/negara/${id}`)
}
