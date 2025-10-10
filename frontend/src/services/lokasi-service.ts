import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { Lokasi } from '@/types/lokasi';

export const adminLokasiCreate = async (body: unknown) => {
  return api.post<ApiResponse<Lokasi>>('/api/lpk/lokasi', body);
};
export const adminLokasiUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<Lokasi>>(`/api/lpk/lokasi/${id}`, body);
};

export const adminLokasiDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/lokasi/${id}`);
};

export const adminLokasiGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<Lokasi[]>>>('/api/lpk/lokasi', { params });
};

export const adminLokasiGetById = async (id: string) => {
  return api.get<ApiResponse<Lokasi>>(`/api/lpk/lokasi/${id}`);
};
