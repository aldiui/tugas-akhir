import { usePermissionStore } from '@/store/permission-store';

export function usePermissions(prefix: string) {
  const { hasPermission } = usePermissionStore();

  return {
    canCreate: hasPermission(`${prefix}_CREATE`),
    canRead: hasPermission(`${prefix}_READ`),
    canUpdate: hasPermission(`${prefix}_UPDATE`),
    canDelete: hasPermission(`${prefix}_DELETE`),
  };
}
