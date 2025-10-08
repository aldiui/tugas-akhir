'use client'

import {
Breadcrumb,
BreadcrumbItem,
BreadcrumbLink,
BreadcrumbList,
BreadcrumbPage,
BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createNegaraSchema } from '@/validation/negara-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import toast from "react-hot-toast"
import { useMutation } from '@tanstack/react-query'
import { adminNegaraCreate } from '@/services/negara-service'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import Link from 'next/link'
export default function Page() {
const router = useRouter()

const form = useForm<z.infer<typeof createNegaraSchema>>({
    resolver: zodResolver(createNegaraSchema),
    defaultValues: {
        kode: '',
        nama: '',
        mata_uang: '',
        kode_mata_uang: '',
        simbol_mata_uang: '',
    }
})

const mutation = useMutation({
    mutationFn: (data: z.infer<typeof createNegaraSchema>) => adminNegaraCreate(data),
    onSuccess: (data) => {
        if (data?.status === 201) {
            toast.success(data.data.message || 'Negara berhasil ditambahkan')
            router.push('/admin/negara')
        } else {
            toast.error(data.data.message || 'Gagal menambahkan negara')
        }
    },
    onError: (error) => {
        if (error instanceof AxiosError && error.response) {
            const errors = error.response.data.errors

            if (errors) {
                Object.keys(errors).forEach(key => {
                    return form.setError(key as "kode" | "nama" | "mata_uang" | "kode_mata_uang" | "simbol_mata_uang", {
                        type: 'manual',
                        message: errors[key][0],
                    })
                })
            }
            toast.error(error.response.data.message || 'Terjadi kesalahan')
        } else if (error instanceof Error) {
            toast.error(error.message)
        }
    },
})

const onSubmit: SubmitHandler<z.infer<typeof createNegaraSchema>> = (data) => {
    mutation.mutate(data)
}

return (
    <div className="w-full h-full p-6 space-y-4">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/negara">Negara</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Tambah</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        
        <Card>
            <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-blue-900">Tambah Negara</h3>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <FormField
                                control={form.control}
                                name="kode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Kode <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Masukkan kode" 
                                                {...field} 
                                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nama <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Masukkan nama" 
                                                {...field} 
                                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mata_uang"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Mata Uang <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Masukkan mata uang" 
                                                {...field} 
                                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="kode_mata_uang"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Kode Mata Uang <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Masukkan kode mata uang" 
                                                {...field} 
                                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="simbol_mata_uang"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Simbol Mata Uang <span className="text-red-600">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Masukkan simbol mata uang" 
                                                {...field} 
                                                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-4 gap-2 border-t">
                            <Button 
                                type="submit" 
                                size="sm"
                                disabled={mutation.isPending}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <Link href="/admin/negara">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    disabled={mutation.isPending}
                                    className="hover:bg-gray-100"
                                >
                                    Batal
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
)
}