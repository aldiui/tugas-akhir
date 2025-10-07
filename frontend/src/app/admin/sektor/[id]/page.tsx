'use client'

import { adminSektorGetById } from '@/services/sektor-service'
import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    
    const { data } = useQuery({
        queryFn: async () => (
            await adminSektorGetById(
                String(id)
            )
        ),
        queryKey: ['detail-sektor', id],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Sektor</h3>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    )
}
