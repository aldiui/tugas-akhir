import api from '@/lib/api';
import { ApiResponse } from '@/types/api';

export const adminPermissionProfile = async () => {
  return api.get<ApiResponse<[]>>('/api/lpk/permission-profile');
};
