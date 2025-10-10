import { z } from 'zod';

const createLokasiSchema = z.object({
  kode: z.string().min(1, 'Kode tidak boleh kosong'),
  nama: z.string().min(1, 'Nama tidak boleh kosong'),
  latitude: z.string().min(1, 'Latitude tidak boleh kosong'),
  longitude: z.string().min(1, 'Longitude tidak boleh kosong'),
  jam_masuk_mulai: z.string().min(1, 'Jam masuk mulai tidak boleh kosong'),
  jam_masuk_selesai: z.string().min(1, 'Jam masuk selesai tidak boleh kosong'),
  jam_keluar_mulai: z.string().min(1, 'Jam keluar mulai tidak boleh kosong'),
  jam_keluar_selesai: z.string().min(1, 'Jam keluar selesai tidak boleh kosong'),
  radius: z.string().min(1, 'Radius tidak boleh kosong'),
  alamat: z.string().optional(),
  telepon: z.string().min(1, 'Telepon tidak boleh kosong'),
});

const updateLokasiSchema = z.object({
  kode: z.string().min(1, 'Kode tidak boleh kosong'),
  nama: z.string().min(1, 'Nama tidak boleh kosong'),
  latitude: z.string().min(1, 'Latitude tidak boleh kosong'),
  longitude: z.string().min(1, 'Longitude tidak boleh kosong'),
  jam_masuk_mulai: z.string().min(1, 'Jam masuk mulai tidak boleh kosong'),
  jam_masuk_selesai: z.string().min(1, 'Jam masuk selesai tidak boleh kosong'),
  jam_keluar_mulai: z.string().min(1, 'Jam keluar mulai tidak boleh kosong'),
  jam_keluar_selesai: z.string().min(1, 'Jam keluar selesai tidak boleh kosong'),
  radius: z.string().min(1, 'Radius tidak boleh kosong'),
  alamat: z.string().optional(),
  telepon: z.string().min(1, 'Telepon tidak boleh kosong'),
});

export { createLokasiSchema, updateLokasiSchema };
