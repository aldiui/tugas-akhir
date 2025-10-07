'use client'

import { adminMataPelajaranGetById } from '@/services/mata-pelajaran-service'
import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    
    const { data } = useQuery({
        queryFn: async () => (
            await adminMataPelajaranGetById(
                String(id)
            )
        ),
        queryKey: ['detail-mata-pelajaran', id],
    })

    return (
        <div className="p-2">
            <h3 className="text-2xl font-bold">Mata Pelajaran</h3>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
    )
}
