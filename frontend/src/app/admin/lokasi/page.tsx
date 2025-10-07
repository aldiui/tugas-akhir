// 'use client'

// import { DataTable } from '@/components/data-table'
// import Pagination from '@/components/pagination'
// import TableFunction from '@/components/table-function'
// import { adminLokasiGetAll } from '@/services/lokasi-service'
// import useAppStore from '@/store/app-store'
// import { useQuery } from '@tanstack/react-query'
// import { useCallback, useEffect, useState } from 'react'
// import { columns } from './columns'
// import LoadingTable from '@/components/loading-table'

// export default function Page() {
//     const { limit, start, setStart, search, sort, setSort } = useAppStore()
//     const [page, setPage] = useState(1)

//     const { data, isLoading, refetch } = useQuery({
//         queryFn: async () =>
//             await adminLokasiGetAll({
//                 page,
//                 limit,
//                 search,
//                 sort_by: sort?.column,
//                 order_by: sort?.type,
//             }),
//         queryKey: ['list-lokasi', page, limit, search, sort],
//     })

//     useEffect(() => {
//         setStart((page - 1) * Number(limit) + 1)
//     }, [page, limit, setStart])

//     useEffect(() => {
//         setPage(1)
//     }, [limit, search])

//     useEffect(() => {
//         if (!sort) {
//             setSort({ column: 'id', type: 'asc' })
//         }
//     }, [sort, setSort])

//     const handlePageChange = useCallback((newPage: number) => {
//         setPage(newPage)
//     }, [])

//     const handleRefresh = useCallback(() => {
//         refetch()
//     }, [refetch])

//     return (
//         <div className="w-full h-full p-6">
//             <div className="mb-6 flex justify-between items-center">
//                 <h3 className="text-2xl font-bold">Lokasi</h3>
//                 <button
//                     onClick={handleRefresh}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Memuat...' : 'Refresh'}
//                 </button>
//             </div>

//             <div className="w-full space-y-4">
//                 <TableFunction />

//                 <div className="w-full overflow-auto rounded-lg border bg-white relative">
//                     <DataTable data={data?.data.data.data ?? []} columns={columns} />
//                     {isLoading && <LoadingTable />}
//                 </div>

//                 {data && !isLoading && (
//                     <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
//                         <div className="text-sm text-gray-600">
//                             Menampilkan {start} sampai {data.data.data.to} dari {data.data.data.total} data
//                         </div>
//                         <Pagination
//                             currentPage={page}
//                             totalPages={Math.ceil(
//                                 (data.data.data.total === 0 ? 1 : data.data.data.total) /
//                                     data.data.data.per_page
//                             )}
//                             onPageChange={handlePageChange}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

import React from 'react'

export default function page() {
    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Jenis Pekerjaan</h3>
        </div>
    )
}

