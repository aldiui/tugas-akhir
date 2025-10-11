'use client';

import AccessDenied from '@/components/access-denied';
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
import { usePermissions } from '@/hooks/use-permissions';
import { adminMataPelajaranCreate } from '@/services/mata-pelajaran-service';
import { createMataPelajaranSchema } from '@/validation/mata-pelajaran-schema';
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
  const { canCreate } = usePermissions('MPL');

  const form = useForm<z.infer<typeof createMataPelajaranSchema>>({
    resolver: zodResolver(createMataPelajaranSchema),
    defaultValues: {
      kode: '',
      nama: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof createMataPelajaranSchema>) => adminMataPelajaranCreate(data),
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast.success(data.data.message || 'Mata pelajaran berhasil ditambahkan');
        router.push('/mata-pelajaran');
      } else {
        toast.error(data.data.message || 'Gagal menambahkan mata pelajaran');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.data;

        if (errors) {
          Object.keys(errors).forEach((key) => {
            return form.setError(key as 'kode' | 'nama', {
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

  const onSubmit: SubmitHandler<z.infer<typeof createMataPelajaranSchema>> = (data) => {
    mutation.mutate(data);
  };

  if (!canCreate) {
    return (
      <AccessDenied
        title="Akses Ditolak"
        message="Anda tidak memiliki akses untuk membuat mata pelajaran."
        backUrl="/mata-pelajaran"
        backLabel="Kembali"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Mata Pelajaran', href: '/mata-pelajaran' },
          { label: 'Tambah' },
        ]}
      />
    );
  }

  return (
    <LayoutAdmin>
      <div className="w-full h-full p-6 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/mata-pelajaran">Mata Pelajaran</Link>
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
              <h3 className="text-2xl font-bold text-blue-900">Tambah Mata Pelajaran</h3>
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
                  <Link href="/mata-pelajaran">
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
