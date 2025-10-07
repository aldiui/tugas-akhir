import api from "@/lib/api"
import { ApiResponse } from "@/types/api"
import { Login } from "@/types/auth"

export const adminAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<Login>>('/api/lpk-admin/login', body)
}

export const adminAuthLogout = async () => {
    return api.post<ApiResponse<1 | 0>>('/api/lpk-admin/logout')
}

export const cpmiAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<Login>>('/api/lpk-cpmi/login', body)
}

export const cpmiAuthLogout = () => {
    return api.post<ApiResponse<1 | 0>>('/api/lpk-cpmi/logout')
}

export const pengajarAuthLogout = async () => {
    return api.post<ApiResponse<1 | 0>>('/api/lpk-pengajar/logout')
}

export const pengajarAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<Login>>('/api/lpk-pengajar/login', body)
}

export const cpmiAuthRegister = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/lpk-cpmi/register', body)
}
