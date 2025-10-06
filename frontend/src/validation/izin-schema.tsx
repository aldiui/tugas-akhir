import { z } from 'zod'

const createIzinSchema = z.object({
    tanggal_mulai : z.string().min(1, "Tanggal mulai izin tidak boleh kosong"),
    tanggal_selesai : z.string().min(1, "Tanggal selesai izin tidak boleh kosong"),
    keterangan : z.string().min(1, "Keterangan izin tidak boleh kosong"),
    dokumen : z.array(z.string()).optional(),
});

const updateIzinSchema = z.object({
    status : z.enum(['Diterima', 'Ditolak'], "Status harus dipilih"),
});

export { createIzinSchema, updateIzinSchema };
