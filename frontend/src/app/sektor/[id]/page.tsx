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
import { Textarea } from '@/components/ui/textarea';
import { adminSektorGetById, adminSektorUpdate } from '@/services/sektor-service';
import { updateSektorSchema } from '@/validation/sektor-schema';
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
    queryFn: async () => await adminSektorGetById(String(id)),
    queryKey: ['detail-sektor', id],
  });

  const form = useForm<z.infer<typeof updateSektorSchema>>({
    resolver: zodResolver(updateSektorSchema),
    defaultValues: {
      nama: '',
      deskripsi: '',
    },
  });

  useEffect(() => {
    if (data?.data.data) {
      form.reset({
        nama: data.data.data.nama,
        deskripsi: data.data.data.deskripsi,
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (formData: z.infer<typeof updateSektorSchema>) =>
      adminSektorUpdate(String(id), formData),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.data.message || 'Sektor berhasil diperbarui');
        router.push('/sektor');
      } else {
        toast.error(data.data.message || 'Gagal memperbarui sektor');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.data;

        if (errors) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as 'nama' | 'deskripsi', {
              type: 'manual',
              message: errors[key][0],
            });
          });
        } else {
          toast.error(error.response.data.message || 'Terjadi kesalahan');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateSektorSchema>> = (formData) => {
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
              <Link href="/sektor">Sektor</Link>
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
              <h3 className="text-2xl font-bold text-blue-900">Edit Sektor</h3>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kode <span className="text-red-600">*</span>
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
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Deskripsi <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan deskripsi"
                            {...field}
                            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                            rows={5}
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
                  <Link href="/sektor">
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
