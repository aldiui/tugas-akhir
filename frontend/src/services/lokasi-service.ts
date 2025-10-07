import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminLokasiCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/lokasi', body)
}
export const adminLokasiUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/lokasi/${id}`, body)
}

export const adminLokasiDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/lokasi/${id}`)
}

export const adminLokasiGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/lokasi', { params })
}

export const adminLokasiGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/lokasi/${id}`)
}
