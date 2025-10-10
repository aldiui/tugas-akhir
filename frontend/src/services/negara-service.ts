import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { Negara } from '@/types/negara';

export const adminNegaraCreate = async (body: unknown) => {
  return api.post<ApiResponse<Negara>>('/api/lpk/negara', body);
};
export const adminNegaraUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<Negara>>(`/api/lpk/negara/${id}`, body);
};

export const adminNegaraDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/negara/${id}`);
};

export const adminNegaraGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<Negara[]>>>('/api/lpk/negara', { params });
};
export const adminNegaraGetById = async (id: string) => {
  return api.get<ApiResponse<Negara>>(`/api/lpk/negara/${id}`);
};
