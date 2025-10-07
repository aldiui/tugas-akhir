'use client'

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import useAppStore from '@/store/app-store'

interface TableSearchInputProps {
    onSearch?: (query: string) => void
    placeholder?: string
    debounceMs?: number
}

const TableSearchInput = ({ 
    onSearch, 
    placeholder = 'Cari...', 
    debounceMs = 500 
}: TableSearchInputProps) => {
    const { search, setSearch } = useAppStore()
    const [inputValue, setInputValue] = useState(search)

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(inputValue)
            onSearch?.(inputValue)
        }, debounceMs)

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue, setSearch, onSearch, debounceMs])

    useEffect(() => {
        setInputValue('')
    }, [])

    return (
        <div className="flex items-center gap-2">
            <label 
                htmlFor="table-search" 
                className="text-sm font-medium shrink-0"
            >
                Search:
            </label>
            <Input
                id="table-search"
                type="text"
                placeholder={placeholder}
                className="h-9 max-w-xs"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />
        </div>
    )
}

export default TableSearchInput