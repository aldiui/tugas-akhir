import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/login', body)
}

export const adminAuthLogout = async () => {
    return api.post<ApiResponse<unknown>>('/api/bahana-admin/logout')
}

export const cpmiAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-cpmi/login', body)
}

export const cpmiAuthLogout = () => {
    return api.post<ApiResponse<unknown>>('/api/bahana-cpmi/logout')
}

export const cpmiAuthRegister = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-cpmi/register', body)
}

export const pengajarAuthLogout = async () => {
    return api.post<ApiResponse<unknown>>('/api/bahana-pengajar/logout')
}

export const pengajarAuthLogin = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-pengajar/login', body)
}

export const pengajarAuthRegister = async (body: unknown) => {
    return api.post<ApiResponse<unknown>>('/api/bahana-pengajar/register', body)
}