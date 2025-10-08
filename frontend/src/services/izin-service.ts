import api from "@/lib/api"
import { ApiResponse, PaginationData } from "@/types/api"
import { Izin } from "@/types/izin"

export const adminIzinUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<Izin>>(`/api/lpk-admin/izin/${id}`, body)
}

export const adminIzinDelete = async (id: string) => {
    return api.delete<ApiResponse<1 | 0>>(`/api/lpk-admin/izin/${id}`)
}

export const adminIzinGetAll = async (params: unknown) => {
    return api.get<ApiResponse<PaginationData<Izin[]>>>('/api/lpk-admin/izin', { params })
}

export const adminIzinGetById = async (id: string) => {
    return api.get<ApiResponse<Izin>>(`/api/lpk-admin/izin/${id}`)
}
