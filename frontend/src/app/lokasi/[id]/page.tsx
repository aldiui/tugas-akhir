'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateLokasiSchema } from '@/validation/lokasi-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import z from "zod"
import toast from "react-hot-toast"
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminLokasiGetById, adminLokasiUpdate } from '@/services/lokasi-service'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { use, useEffect } from 'react'
import LoadingTable from '@/components/loading-table'
import { Textarea } from "@/components/ui/textarea"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    
    const { data, isLoading } = useQuery({
        queryFn: async () => await adminLokasiGetById(String(id)),
        queryKey: ['detail-lokasi', id],
    })

    const form = useForm<z.infer<typeof updateLokasiSchema>>({
        resolver: zodResolver(updateLokasiSchema),
        defaultValues: {
            kode: '',
            nama: '',
            latitude: parseFloat('0').toString(),
            longitude: parseFloat('0').toString(),
            jam_masuk_mulai: '',
            jam_masuk_selesai: '',
            jam_keluar_mulai: '',
            jam_keluar_selesai: '',
            radius: parseFloat('0').toString(),
            alamat: '',
            telepon: '',
        }
    })

    useEffect(() => {
        if (data?.data.data) {
            form.reset({
                kode: data.data.data.kode,
                nama: data.data.data.nama,
                latitude: String(data.data.data.latitude),
                longitude: String(data.data.data.longitude),
                jam_masuk_mulai: data.data.data.jam_masuk_mulai,
                jam_masuk_selesai: data.data.data.jam_masuk_selesai,
                jam_keluar_mulai: data.data.data.jam_keluar_mulai,
                jam_keluar_selesai: data.data.data.jam_keluar_selesai,
                radius: String(data.data.data.radius),
                alamat: data.data.data.alamat,
                telepon: data.data.data.telepon,
            })
        }
    }, [data, form])

    const mutation = useMutation({
        mutationFn: (formData: z.infer<typeof updateLokasiSchema>) => 
            adminLokasiUpdate(String(id), formData),
        onSuccess: (data) => {
            if (data.status === 200) {
                toast.success(data.data.message || 'Lokasi berhasil diperbarui')
                router.push('/admin/lokasi')
            } else {
                toast.error(data.data.message || 'Gagal memperbarui lokasi')
            }
        },
        onError: (error) => {
            if (error instanceof AxiosError && error.response) {
                const errors = error.response.data.errors

                if (errors) {
                    Object.keys(errors).forEach(key => {
                        return form.setError(key as "kode" | "nama" | "latitude" | "longitude" | "jam_masuk_mulai" | "jam_masuk_selesai" | "jam_keluar_mulai" | "jam_keluar_selesai" | "radius" | "telepon" | "alamat", {
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

    const onSubmit: SubmitHandler<z.infer<typeof updateLokasiSchema>> = (formData) => {
        mutation.mutate(formData)
    }

    if (isLoading) {
        return (
            <div className="w-full h-full p-6 space-y-4">
                <Card>
                    <CardContent className="p-6 relative min-h-[400px]">
                        <LoadingTable />
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full h-full p-6 space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/">Dashboar</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href="/lokasi">Lokasi</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <Card>
                <CardHeader className="border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-blue-900">Edit Lokasi</h3>
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
                                    name="latitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Latitude <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number"
                                                    placeholder="Masukkan latitude" 
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
                                    name="longitude"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Longitude <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number"
                                                    placeholder="Masukkan longitude" 
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
                                    name="jam_masuk_mulai"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Jam Masuk Mulai <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="time"
                                                    step="1"
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
                                    name="jam_masuk_selesai"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Jam Masuk Selesai <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="time"
                                                    step="1"
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
                                    name="jam_keluar_mulai"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Jam Keluar Mulai <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="time"
                                                    step="1"
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
                                    name="jam_keluar_selesai"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Jam Keluar Selesai <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="time"
                                                    step="1"
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
                                    name="radius"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Radius <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number"
                                                    placeholder="Masukkan radius" 
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
                                    name="alamat"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Alamat
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea  
                                                    placeholder="Masukkan alamat" 
                                                    {...field} 
                                                    className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                                                    rows={5}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="telepon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Telepon <span className="text-red-600">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Masukkan telepon" 
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
                                    {mutation.isPending ? 'Menyimpan...' : 'Perbarui'}
                                </Button>
                                <Link href="/lokasi">
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