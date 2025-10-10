import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { Role } from '@/types/role';

export const adminRoleCreate = async (body: unknown) => {
  return api.post<ApiResponse<Role>>('/api/lpk/role', body);
};

export const adminRoleUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<Role>>(`/api/lpk/role/${id}`, body);
};

export const adminRoleDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/role/${id}`);
};

export const adminRoleGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<Role[]>>>('/api/lpk/role', { params });
};

export const adminRoleGetById = async (id: string) => {
  return api.get<ApiResponse<Role>>(`/api/lpk/role/${id}`);
};
