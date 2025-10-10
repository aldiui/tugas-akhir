import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { Sektor } from '@/types/sektor';

export const adminSektorCreate = async (body: unknown) => {
  return api.post<ApiResponse<Sektor>>('/api/lpk/sektor', body);
};

export const adminSektorUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<Sektor>>(`/api/lpk/sektor/${id}`, body);
};

export const adminSektorDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/sektor/${id}`);
};

export const adminSektorGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<Sektor[]>>>('/api/lpk/sektor', { params });
};

export const adminSektorGetById = async (id: string) => {
  return api.get<ApiResponse<Sektor>>(`/api/lpk/sektor/${id}`);
};
