import api from "@/lib/api"
import { ApiResponse, PaginationData } from "@/types/api"
import { CPMI, User } from "@/types/user"

export const adminUserCreate = async (body: unknown) => {
    return api.post<ApiResponse<User>>('/api/lpk-admin/user', body)
}

export const adminUserUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<User>>(`/api/lpk-admin/user/${id}`, body)
}

export const adminUserDelete = async (id: string) => {
    return api.delete<ApiResponse<1 | 0>>(`/api/lpk-admin/user/${id}`)
}

export const adminUserGetAll = async (params: unknown) => {
    return api.get<ApiResponse<PaginationData<User[]>>>('/api/lpk-admin/user', { params })
}

export const adminUserGetById = async (id: string) => {
    return api.get<ApiResponse<User>>(`/api/lpk-admin/user/${id}`)
}

export const adminCpmiUpdate = async (id: string, body: unknown) => {
    return api.put<ApiResponse<CPMI>>(`/api/lpk-admin/cpmi/${id}`, body)
}

export const adminCpmiDelete = async (id: string) => {
    return api.delete<ApiResponse<1 | 0>>(`/api/lpk-admin/cpmi/${id}`)
}

export const adminCpmiGetAll = async (params: unknown) => {
    return api.get<ApiResponse<PaginationData<CPMI[]>>>('/api/lpk-admin/cpmi', { params })
}

export const adminCpmiGetById = async (id: string) => {
    return api.get<ApiResponse<CPMI>>(`/api/lpk-admin/cpmi/${id}`)
}
