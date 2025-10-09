"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { User } from "@/types/user"
import useAppStore from "@/store/app-store"
import { TableSortableHeader } from "@/components/table-sortable-header"
import { TableDelete } from "@/components/table-delete"
import { adminUserDelete } from "@/services/user-service"

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "nama",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="nama" label="Nama" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("nama")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="email" label="Email" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return <TableSortableHeader column={column} columnName="role" label="Role" />
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("role")}</div>,
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
            const user = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        asChild
                    >
                        <Link href={`/admin/user/${user.id}`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <TableDelete
                        id={user.id}
                        itemName={user.nama}
                        queryKey={['list-user']}
                        deleteFn={adminUserDelete}
                    />
                </div>
            )
        },
    },
]