import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminMataPelajaranCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/mata-pelajaran', body)
}

export const adminMataPelajaranUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/mata-pelajaran/${id}`, body)
}
export const adminMataPelajaranDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/mata-pelajaran/${id}`)
}

export const adminMataPelajaranGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/mata-pelajaran', { params })
}

export const adminMataPelajaranGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/mata-pelajaran/${id}`)
}
