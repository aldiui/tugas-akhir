"use client"

import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import useAppStore from "@/store/app-store"

interface TableSortableHeaderProps<TData> {
    column: Column<TData, unknown>
    columnName: string
    label: string
}

export function TableSortableHeader<TData>({ 
    column, 
    columnName, 
    label 
}: TableSortableHeaderProps<TData>) {
    const { setSort } = useAppStore()

    const handleSort = () => {
        const currentSort = column.getIsSorted()
        const newSort = currentSort === "asc" ? "desc" : "asc"
        column.toggleSorting(currentSort === "asc")
        setSort({ column: columnName, type: newSort })
    }

    const isSorted = column.getIsSorted()

    return (
        <Button
            variant="ghost"
            onClick={handleSort}
            className="hover:bg-transparent"
        >
            <span className={isSorted ? "font-bold" : "font-normal"}>
                {label}
            </span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}