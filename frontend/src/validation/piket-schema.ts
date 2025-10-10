import { z } from 'zod';

const createPiketSchema = z.object({
  jam_masuk: z.string().min(1, 'Jam masuk tidak boleh kosong'),
  jam_keluar: z.string().min(1, 'Jam keluar tidak boleh kosong'),
  kegiatan: z.string().min(1, 'Kegiatan tidak boleh kosong'),
  foto_kegiatan: z.array(z.string()).optional(),
});

export { createPiketSchema };
