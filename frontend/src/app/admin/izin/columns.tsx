"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Izin } from "@/types/izin"
import useAppStore from "@/store/app-store"
import { TableSortableHeader } from "@/components/table-sortable-header"

export const columns: ColumnDef<Izin>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="id" label="No" />
        },
        cell: function Cell({ row }) {
			const { start } = useAppStore();
			return <div className="font-medium">{start + row.index}</div>;
		},
    },
    {
        accessorKey: "tanggal_mulai",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="tanggal_mulai" label="Tanggal Mulai" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("tanggal_mulai")}</div>,
    },
    {
        accessorKey: "tanggal_selesai",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="tanggal_selesai" label="Tanggal Selesai" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("tanggal_selesai")}</div>,
    },
    {
        accessorKey: "cpmi",
        header: ({ column }) => (
            <TableSortableHeader column={column} columnName="cpmi" label="CPMI" />
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("cpmi")}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="created_at" label="Dibuat Pada" />
        },
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
            const izin = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        asChild
                    >
                        <Link href={`/admin/izin/${izin.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        asChild
                    >
                        <Link href={`/admin/izin/${izin.id}/edit`}>
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