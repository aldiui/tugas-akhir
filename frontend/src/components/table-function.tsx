'use client'

import React from 'react'
import TableSearchInput from './table-input-search'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useAppStore from '@/store/app-store'
import perPageOptions from '@/source/perpage-option'

const TableFunction = ({ withSearch = true }: { withSearch?: boolean }) => {
    const { limit, setLimit } = useAppStore()

    return (
        <div className="flex flex-col xl:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Tampilkan</span>
                <Select defaultValue={limit} onValueChange={(value: string) => setLimit(value)}>
                    <SelectTrigger className="h-9 w-20 rounded-md border-gray-300">
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 bg-white">
                        <SelectGroup>
                            {perPageOptions.map((option, i) => (
                                <SelectItem 
                                    className="hover:bg-gray-100 cursor-pointer" 
                                    value={option.value} 
                                    key={i}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <span>data</span>
            </div>
            {withSearch && <TableSearchInput />}
        </div>
    )
}

export default TableFunction