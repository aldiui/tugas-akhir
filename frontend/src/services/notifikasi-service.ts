import api from "@/lib/api"
import { ApiResponse, PaginationData } from "@/types/api"
import { Notifikasi } from "@/types/notifikasi"

export const adminNotifikasiCreate = async (body: unknown) => {
    return api.post<ApiResponse<Notifikasi>>('/api/lpk-admin/notifikasi', body)
}

export const adminNotifikasiUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<Notifikasi>>(`/api/lpk-admin/notifikasi/${id}`, body)
}

export const adminNotifikasiDelete = async (id: string) => {
    return api.delete<ApiResponse<1 | 0>>(`/api/lpk-admin/notifikasi/${id}`)
}

export const adminNotifikasiGetAll = async (params: unknown) => {
    return api.get<ApiResponse<PaginationData<Notifikasi[]>>>('/api/lpk-admin/notifikasi', { params })
}

export const adminNotifikasiGetById = async      (id: string) => {
    return api.get<ApiResponse<Notifikasi>>(`/api/lpk-admin/notifikasi/${id}`)
}
