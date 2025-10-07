import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminKelasCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/kelas', body)
}

export const adminKelasUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/kelas/${id}`, body)
}
export const adminKelasDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/kelas/${id}`)
}

export const adminKelasGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/kelas', { params })
}

export const adminKelasGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/kelas/${id}`)
}
