import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PermissionStore {
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
  hasPermission: (permission: string) => boolean;
  clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionStore>()(
  persist(
    (set, get) => ({
      permissions: [],
      setPermissions: (permissions) => set({ permissions }),
      hasPermission: (permission) => get().permissions.includes(permission),
      clearPermissions: () => set({ permissions: [] }),
    }),
    {
      name: 'permission-storage',
    }
  )
);
