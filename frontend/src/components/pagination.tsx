"use client"

import React from 'react'
import { Button } from './ui/button'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = []
        const showPages = 5 

        if (totalPages <= showPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const startPage = Math.max(2, currentPage - 1)
            const endPage = Math.min(totalPages - 1, currentPage + 1)

            pages.push(1)

            if (startPage > 2) {
                pages.push('...')
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            if (endPage < totalPages - 1) {
                pages.push('...')
            }

            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()

    return (
        <div className="flex justify-center items-center space-x-2 max-w-screen flex-wrap gap-y-1 order-last lg:order-none">
            <Button 
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)}
                variant="outline"
                size="sm"
            >
                {'<'} Sebelumnya
            </Button>

            {pageNumbers.map((page, index) => (
                <Button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    className={`min-w-[40px] ${
                        page === currentPage
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                    disabled={page === '...'}>
                    {page}
                </Button>
            ))}

            <Button 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(currentPage + 1)}
                variant="outline"
                size="sm"
            >
                Selanjutnya {'>'}
            </Button>
        </div>
    )
}

export default Pagination