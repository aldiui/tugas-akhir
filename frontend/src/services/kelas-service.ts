import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { Kelas } from '@/types/kelas';

export const adminKelasCreate = async (body: unknown) => {
  return api.post<ApiResponse<Kelas>>('/api/lpk/kelas', body);
};

export const adminKelasUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<Kelas>>(`/api/lpk/kelas/${id}`, body);
};
export const adminKelasDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/kelas/${id}`);
};

export const adminKelasGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<Kelas[]>>>('/api/lpk/kelas', { params });
};

export const adminKelasGetById = async (id: string) => {
  return api.get<ApiResponse<Kelas>>(`/api/lpk/kelas/${id}`);
};
