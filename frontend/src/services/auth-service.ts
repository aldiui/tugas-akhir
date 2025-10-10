import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { Login } from '@/types/auth';

export const adminAuthLogin = async (body: unknown) => {
  return api.post<ApiResponse<Login>>('/api/lpk/login', body);
};

export const adminAuthLogout = async () => {
  return api.post<ApiResponse<1 | 0>>('/api/lpk/logout');
};
