import { z } from 'zod'

const createNotifikasiSchema = z.object({
    judul : z.string().min(1, "Judul notifikasi tidak boleh kosong"),
    deskripsi : z.string().min(1, "Deskripsi notifikasi tidak boleh kosong"),
    status : z.enum(['urgent', 'biasa'], "Status notifikasi tidak valid"),
    target: z.enum(['semua', 'spesifik'], "Target notifikasi tidak valid"),
    cpmi_id: z.array(z.string()).optional(),
});

export { createNotifikasiSchema };
