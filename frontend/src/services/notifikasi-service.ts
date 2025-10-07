import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminNotifikasiCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/notifikasi', body)
}

export const adminNotifikasiUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/notifikasi/${id}`, body)
}

export const adminNotifikasiDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/notifikasi/${id}`)
}

export const adminNotifikasiGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/notifikasi', { params })
}

export const adminNotifikasiGetById = async      (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/notifikasi/${id}`)
}
