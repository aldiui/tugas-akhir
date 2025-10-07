import api from "@/lib/api"
import { ApiResponse } from "@/types/api"

export const adminPermissionGetAll = async () => {
    return api.get<ApiResponse<unknown>>('/api/bahana-admin/permission')
}

