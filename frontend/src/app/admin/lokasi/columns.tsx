import { ColumnDef } from '@tanstack/react-table'
import { Lokasi } from '@/types/lokasi'
import useAppStore from '@/store/app-store'

export const columns: ColumnDef<Lokasi>[] = [
    {
        accessorKey: 'no',
        cell: function Cell({ row }) {
            const { start } = useAppStore()

            return start + row.index
        },
        header: 'No',
    },
    {
        accessorKey: 'nama',
        header: 'Nama',
        cell: ({ row }) => row?.original?.nama ?? "",
    },
    {
        accessorKey: 'nama',
        header: 'Nama',
        cell: ({ row }) => row?.original?.nama ?? "",
    },
     {
        accessorKey: 'nama',
        header: 'Nama',
        cell: ({ row }) => row?.original?.nama ?? "",
    },

]
