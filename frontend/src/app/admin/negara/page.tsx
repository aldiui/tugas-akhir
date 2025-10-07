'use client'

import { adminNegaraGetAll } from '@/services/negara-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Page() {
    const { data } = useQuery({
        queryFn: async () => (
            await adminNegaraGetAll(
                { limit: 10, page: 1 }
            )
        ),
        queryKey: ['list-negara'],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Negara</h3>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    )
}
