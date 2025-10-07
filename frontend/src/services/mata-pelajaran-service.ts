import api from "@/lib/api"
import { ApiResponse, PaginationData } from "@/types/api"
import { MataPelajaran } from "@/types/mata-pelajaran"

export const adminMataPelajaranCreate = async (body: unknown) => {
    return api.post<ApiResponse<MataPelajaran>>('/api/lpk-admin/mata-pelajaran', body)
}

export const adminMataPelajaranUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<MataPelajaran>>(`/api/lpk-admin/mata-pelajaran/${id}`, body)
}
export const adminMataPelajaranDelete = async (id: string) => {
    return api.delete<ApiResponse<1 | 0>>(`/api/lpk-admin/mata-pelajaran/${id}`)
}

export const adminMataPelajaranGetAll = async (params: unknown) => {
    return api.get<ApiResponse<PaginationData<MataPelajaran[]>>>('/api/lpk-admin/mata-pelajaran', { params })
}

export const adminMataPelajaranGetById = async (id: string) => {
    return api.get<ApiResponse<MataPelajaran>>(`/api/lpk-admin/mata-pelajaran/${id}`)
}
