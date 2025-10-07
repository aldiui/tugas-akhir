import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminIzinUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/izin/${id}`, body)
}

export const adminIzinDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/izin/${id}`)
}

export const adminIzinGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/izin', { params })
}

export const adminIzinGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/izin/${id}`)
}
