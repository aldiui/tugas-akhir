'use client'

import { adminSektorGetAll } from '@/services/sektor-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page() {
    const { data } = useQuery({
        queryFn: async () => (
            await adminSektorGetAll(
                { limit: 10, page: 1 }
            )
        ),
        queryKey: ['list-sektor'],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Sektor</h3>
            <pre>{JSON.stringify(data?.data?.data, null, 2)}</pre>
        </div>
    )
}
