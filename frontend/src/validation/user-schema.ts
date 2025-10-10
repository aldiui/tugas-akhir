import { z } from 'zod';

const createUserSchema = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong'),
    role_id: z.string().min(1, 'Role tidak boleh kosong'),
    lokasi_id: z.string().min(1, 'Lokasi tidak boleh kosong'),
    email: z.string().email('Email tidak valid'),
    nomor_telepon: z
      .string()
      .min(10, 'Nomor telepon harus minimal 10 digit')
      .max(15, 'Nomor telepon maksimal 15 digit'),
    alamat: z.string().min(1, 'Alamat tidak boleh kosong'),
    password: z.string().min(8, 'Password harus minimal 8 karakter'),
    konfirmasi_password: z.string().min(8, 'Konfirmasi password harus minimal 8 karakter'),
  })
  .refine((data) => data.password === data.konfirmasi_password, {
    message: 'Password dan konfirmasi password harus sama',
    path: ['konfirmasi_password'],
  });

const updateUserSchema = z
  .object({
    nama: z.string().min(1, 'Nama tidak boleh kosong'),
    role_id: z.string().min(1, 'Role tidak boleh kosong'),
    lokasi_id: z.string().min(1, 'Lokasi tidak boleh kosong'),
    email: z.string().email('Email tidak valid'),
    nomor_telepon: z
      .string()
      .min(10, 'Nomor telepon harus minimal 10 digit')
      .max(15, 'Nomor telepon maksimal 15 digit'),
    alamat: z.string().min(1, 'Alamat tidak boleh kosong'),
    password: z.string().min(8, 'Password harus minimal 8 karakter').optional().or(z.literal('')),
    konfirmasi_password: z
      .string()
      .min(8, 'Konfirmasi password harus minimal 8 karakter')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      if (data.password || data.konfirmasi_password) {
        return data.password === data.konfirmasi_password;
      }
      return true;
    },
    {
      message: 'Password dan konfirmasi password harus sama',
      path: ['konfirmasi_password'],
    }
  );

export { createUserSchema, updateUserSchema };
