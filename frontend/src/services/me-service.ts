import api from '@/lib/api';
import { ApiResponse } from '@/types/api';

export const adminPermissionProfile = async () => {
  return api.get<ApiResponse<string[]>>('/api/lpk/permission-profile');
};
