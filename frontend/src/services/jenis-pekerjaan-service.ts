import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminJenisPekerjaanCreate = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/jenis-pekerjaan', body)
}

export const adminJenisPekerjaanUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<unknown>>(`/api/bahana-admin/jenis-pekerjaan/${id}`, body)
}
export const adminJenisPekerjaanDelete = async (id: string) => {
    return api.delete<ApiResponse<unknown>>(`/api/bahana-admin/jenis-pekerjaan/${id}`)
}

export const adminJenisPekerjaanGetAll = async (params: unknown) => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/jenis-pekerjaan', { params })
}

export const adminJenisPekerjaanGetById = async (id: string) => {
    return api.get<ApiResponse<unknown>>(`/api/bahana-admin/jenis-pekerjaan/${id}`)
}
