'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { adminAuthLogin } from '@/services/auth-service';
import { usePermissionStore } from '@/store/permission-store';
import { loginSchema } from '@/validation/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const clearPermissions = usePermissionStore((state) => state.clearPermissions);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof loginSchema>) => adminAuthLogin(data),
    onSuccess: (data) => {
      if (data?.status === 200) {
        const token = data.data.data.token;
        if (token) {
          const maxAge = 7 * 24 * 60 * 60;
          document.cookie = `token=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Strict${location.protocol === 'https:' ? '; Secure' : ''}`;
        }
        clearPermissions();
        toast.success(data.data.message || 'Login berhasil');
        router.push('/');
      } else {
        toast.error(data.data.message || 'Gagal login');
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        const errors = error.response.data.data;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            return form.setError(key as 'email' | 'password', {
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

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Logo Bahana Mobile"
                width={140}
                height={100}
                className="object-contain px-6 py-2 bg-blue-600 rounded-xl"
                priority
              />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-600">*</span>
                      </FormLabel>
                      <Input
                        type="email"
                        placeholder="Masukkan email"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Masukkan password"
                            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={mutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    {mutation.isPending ? 'Memproses...' : 'Masuk'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
