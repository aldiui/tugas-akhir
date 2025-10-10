import api from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { Permission } from '@/types/permission';

export const adminPermissionGetAll = async () => {
  return api.get<ApiResponse<Permission[]>>('/api/lpk/permission');
};
