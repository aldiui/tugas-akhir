import { create } from 'zustand'

type Sort = {
    column: string
    type: 'asc' | 'desc'
}

type IAppStore = {
    sort: Sort | null
    setSort: (sort: Sort | null) => void
    isOpenSidebar: boolean
    setIsOpenSidebar: (isOpenSidebar: boolean) => void
    sidebar: string
    setSidebar: (sidebar: string) => void
    limit: string
    setLimit: (limit: string) => void
    search: string
    setSearch: (limit: string) => void
    start: number
    setStart: (limit: number) => void
}

const useAppStore = create<IAppStore>(set => ({
    sort: null,
    setSort: sort => set({ sort: sort }),
    isOpenSidebar: false,
    setIsOpenSidebar: isOpenSidebar => set({ isOpenSidebar: isOpenSidebar }),
    sidebar: '',
    setSidebar: sidebar => set({ sidebar: sidebar }),
    limit: '10',
    setLimit: limit => set({ limit: limit }),
    search: '',
    setSearch: search => set({ search: search }),
    start: 1,
    setStart: start => set({ start: start }),

}))

export default useAppStore
