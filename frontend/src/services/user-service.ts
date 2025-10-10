import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { CPMI, User } from '@/types/user';

export const adminUserCreate = async (body: unknown) => {
  return api.post<ApiResponse<User>>('/api/lpk/user', body);
};

export const adminUserUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<User>>(`/api/lpk/user/${id}`, body);
};

export const adminUserDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/user/${id}`);
};

export const adminUserGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<User[]>>>('/api/lpk/user', { params });
};

export const adminUserGetById = async (id: string) => {
  return api.get<ApiResponse<User>>(`/api/lpk/user/${id}`);
};

export const adminCpmiUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<CPMI>>(`/api/lpk/cpmi/${id}`, body);
};

export const adminCpmiDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/cpmi/${id}`);
};

export const adminCpmiGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<CPMI[]>>>('/api/lpk/cpmi', { params });
};

export const adminCpmiGetById = async (id: string) => {
  return api.get<ApiResponse<CPMI>>(`/api/lpk/cpmi/${id}`);
};
