import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminSektorCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/sektor', body)
}

export const adminSektorUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/sektor/${id}`, body)
}

export const adminSektorDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/sektor/${id}`)
}

export const adminSektorGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/sektor', { params })
}

export const adminSektorGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/sektor/${id}`)
}
