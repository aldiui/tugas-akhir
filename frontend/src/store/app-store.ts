import { create } from 'zustand';

interface AppStore {
  limit: string;
  setLimit: (limit: string) => void;
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  start: number;
  setStart: (start: number) => void;
  sort: { column: string; type: 'asc' | 'desc' } | null;
  setSort: (sort: { column: string; type: 'asc' | 'desc' } | null) => void;
}

const useAppStore = create<AppStore>((set) => ({
  limit: '10', // Default value sebagai string
  setLimit: (limit) => set({ limit }),
  search: '',
  setSearch: (search) => set({ search }),
  page: 1,
  setPage: (page) => set({ page }),
  start: 1,
  setStart: (start) => set({ start }),
  sort: null,
  setSort: (sort) => set({ sort }),
}));

export default useAppStore;
