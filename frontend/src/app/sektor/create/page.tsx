'use client';

import LayoutAdmin from '@/components/layout-admin';
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
import { adminSektorCreate } from '@/services/sektor-service';
import { createSektorSchema } from '@/validation/sektor-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createSektorSchema>>({
    resolver: zodResolver(createSektorSchema),
    defaultValues: {
      nama: '',
      deskripsi: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof createSektorSchema>) => adminSektorCreate(data),
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast.success(data.data.message || 'Sektor berhasil ditambahkan');
        router.push('/admin/sektor');
      } else {
        toast.error(data.data.message || 'Gagal menambahkan sektor');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.errors;

        if (errors) {
          Object.keys(errors).forEach((key) => {
            return form.setError(key as 'nama' | 'deskripsi', {
              type: 'manual',
              message: errors[key][0],
            });
          });
        }
        toast.error(error.response.data.message || 'Terjadi kesalahan');
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createSektorSchema>> = (data) => {
    mutation.mutate(data);
  };

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
              <BreadcrumbPage>Tambah</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-blue-900">Tambah Sektor</h3>
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
                    {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
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
