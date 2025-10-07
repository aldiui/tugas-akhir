'use client'

import { adminNegaraGetById } from '@/services/negara-service'
import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    
    const { data } = useQuery({
        queryFn: async () => (
            await adminNegaraGetById(
                String(id)
            )
        ),
        queryKey: ['detail-negara', id],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Negara</h3>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    )
}
