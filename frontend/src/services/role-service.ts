import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminRoleCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/role', body)
}

export const adminRoleUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/role/${id}`, body)
}

export const adminRoleDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/role/${id}`)
}

export const adminRoleGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/role', { params })
}

export const adminRoleGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/role/${id}`)
}
