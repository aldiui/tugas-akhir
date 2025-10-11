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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { adminPermissionGetAll } from '@/services/permission-service';
import { adminRoleGetById, adminRoleUpdate } from '@/services/role-service';
import { Permission } from '@/types/permission';
import { updateRoleSchema } from '@/validation/role-schema';
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
    queryFn: async () => await adminRoleGetById(String(id)),
    queryKey: ['detail-role', id],
  });

  const form = useForm<z.infer<typeof updateRoleSchema>>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      nama: '',
      tipe: 'CPMI',
      permissions: [],
    },
  });

  const tipeOptions = [
    { value: 'CPMI', label: 'CPMI' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Pengajar', label: 'Pengajar' },
  ];

  const { data: permissionData, isLoading: permissionLoading } = useQuery({
    queryFn: async () => await adminPermissionGetAll(),
    queryKey: ['list-permission-all'],
  });

  useEffect(() => {
    if (data?.data.data) {
      form.reset({
        nama: data.data.data.nama,
        tipe: data.data.data.tipe as 'CPMI' | 'Admin' | 'Pengajar',
        permissions: data.data.data.permissions || [],
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (formData: z.infer<typeof updateRoleSchema>) =>
      adminRoleUpdate(String(id), formData),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.data.message || 'Role berhasil diperbarui');
        router.push('/role');
      } else {
        toast.error(data.data.message || 'Gagal memperbarui role');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.data;

        if (errors) {
          Object.keys(errors).forEach((key) => {
            form.setError(key as 'nama' | 'tipe' | 'permissions', {
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

  const onSubmit: SubmitHandler<z.infer<typeof updateRoleSchema>> = (formData) => {
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
              <Link href="/role">Role</Link>
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
              <h3 className="text-2xl font-bold text-blue-900">Edit Role</h3>
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
                    name="tipe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tipe <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          key={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 w-full">
                              <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tipeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Permissions <span className="text-red-600">*</span>
                        </FormLabel>
                      </div>
                      {permissionLoading ? (
                        <div className="text-sm text-gray-500">Loading permissions...</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-lg p-4 max-h-96 overflow-y-auto">
                          {permissionData?.data.data?.map((permission: Permission) => (
                            <FormField
                              key={permission.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={permission.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, permission.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== permission.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {permission.nama}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4 gap-2 border-t">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={mutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {mutation.isPending ? 'Menyimpan...' : 'Perbarui'}
                  </Button>
                  <Link href="/role">
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
