"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Negara } from "@/types/negara"
import useAppStore from "@/store/app-store"
import { TableSortableHeader } from "@/components/table-sortable-header"

export const columns: ColumnDef<Negara>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <TableSortableHeader column={column} columnName="id" label="No" />
        ),
        cell: function Cell({ row }) {
			const { start } = useAppStore();
			return <div className="font-medium">{start + row.index}</div>;
		},
    },
    {
        accessorKey: "kode",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="kode" label="Kode" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("kode")}</div>,
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="nama" label="Nama" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("nama")}</div>,
    },
    {
        accessorKey: "mata_uang",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="mata_uang" label="Mata Uang" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("mata_uang")}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <TableSortableHeader column={column} columnName="created_at" label="Dibuat Pada" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return <div>{date.toLocaleDateString("id-ID", { 
                day: "2-digit", 
                month: "long", 
                year: "numeric" 
            })}</div>
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const negara = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        asChild
                    >
                        <Link href={`/admin/negara/${negara.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        asChild
                    >
                        <Link href={`/admin/negara/${negara.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]