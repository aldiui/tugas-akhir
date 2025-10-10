'use client';

import LayoutAdmin from '@/components/layout-admin';
import LoadingTable from '@/components/loading-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { adminNegaraGetById, adminNegaraUpdate } from '@/services/negara-service';
import { updateNegaraSchema } from '@/validation/negara-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryFn: async () => await adminNegaraGetById(String(id)),
    queryKey: ['detail-negara', id],
  });

  const form = useForm<z.infer<typeof updateNegaraSchema>>({
    resolver: zodResolver(updateNegaraSchema),
    defaultValues: {
      kode: '',
      nama: '',
      mata_uang: '',
      kode_mata_uang: '',
      simbol_mata_uang: '',
    },
  });

  useEffect(() => {
    if (data?.data.data) {
      form.reset({
        kode: data.data.data.kode,
        nama: data.data.data.nama,
        mata_uang: data.data.data.mata_uang,
        kode_mata_uang: data.data.data.kode_mata_uang,
        simbol_mata_uang: data.data.data.simbol_mata_uang,
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (formData: z.infer<typeof updateNegaraSchema>) =>
      adminNegaraUpdate(String(id), formData),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.data.message || 'Negara berhasil diperbarui');
        router.push('/admin/negara');
      } else {
        toast.error(data.data.message || 'Gagal memperbarui negara');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.errors;

        if (errors) {
          Object.keys(errors).forEach((key) => {
            form.setError(
              key as 'kode' | 'nama' | 'mata_uang' | 'kode_mata_uang' | 'simbol_mata_uang',
              {
                type: 'manual',
                message: errors[key][0],
              }
            );
          });
        }
        toast.error(error.response.data.message || 'Terjadi kesalahan');
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateNegaraSchema>> = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <LayoutAdmin>
        <div className="w-full h-full p-6 space-y-4">
          <Card>
            <CardContent className="p-6 relative min-h-[400px]">
              <LoadingTable />
            </CardContent>
          </Card>
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <div className="w-full h-full p-6 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Dashboar</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/negara">Negara</Link>
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
              <h3 className="text-2xl font-bold text-blue-900">Edit Negara</h3>
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
                    {mutation.isPending ? 'Menyimpan...' : 'Perbarui'}
                  </Button>
                  <Link href="/negara">
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
    </LayoutAdmin>
  );
}
