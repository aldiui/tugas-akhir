import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PermissionState {
  permissions: string[];
  isLoading: boolean;
  error: string | null;
  setPermissions: (permissions: string[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearPermissions: () => void;
  hasPermission: (permission: string) => boolean;
}

export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      permissions: [],
      isLoading: false,
      error: null,
      setPermissions: (permissions) => set({ permissions, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      clearPermissions: () => set({ permissions: [], error: null }),
      hasPermission: (permission) => get().permissions.includes(permission),
    }),
    {
      name: 'permission-storage',
    }
  )
);
