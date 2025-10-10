import api from '@/lib/api';
import { ApiResponse, PaginationData } from '@/types/api';
import { JenisPekerjaan } from '@/types/jenis-pekerjaan';

export const adminJenisPekerjaanCreate = async (body: unknown) => {
  return api.post<ApiResponse<JenisPekerjaan>>('/api/lpk/jenis-pekerjaan', body);
};

export const adminJenisPekerjaanUpdate = async (id: string, body: unknown) => {
  return api.put<ApiResponse<JenisPekerjaan>>(`/api/lpk/jenis-pekerjaan/${id}`, body);
};
export const adminJenisPekerjaanDelete = async (id: string) => {
  return api.delete<ApiResponse<1 | 0>>(`/api/lpk/jenis-pekerjaan/${id}`);
};

export const adminJenisPekerjaanGetAll = async (params: unknown) => {
  return api.get<ApiResponse<PaginationData<JenisPekerjaan[]>>>('/api/lpk/jenis-pekerjaan', {
    params,
  });
};

export const adminJenisPekerjaanGetById = async (id: string) => {
  return api.get<ApiResponse<JenisPekerjaan>>(`/api/lpk/jenis-pekerjaan/${id}`);
};
