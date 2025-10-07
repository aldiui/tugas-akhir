import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminUserCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/user', body)
}

export const adminUserUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/user/${id}`, body)
}

export const adminUserDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/user/${id}`)
}

export const adminUserGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/user', { params })
}

export const adminUserGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/user/${id}`)
}
