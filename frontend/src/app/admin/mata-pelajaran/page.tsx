'use client'

import { adminMataPelajaranGetAll } from '@/services/mata-pelajaran-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page() {
    const { data } = useQuery({
        queryFn: async () => (
            await adminMataPelajaranGetAll(
                { limit: 10, page: 1 }
            )
        ),
        queryKey: ['list-mata-pelajaran'],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Mata Pelajaran</h3>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    )
}
