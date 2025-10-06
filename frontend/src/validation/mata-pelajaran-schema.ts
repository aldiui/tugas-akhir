import { z } from 'zod'

const createMataPelajaranSchema = z.object({
    kode : z.string().min(1, "Kode mata pelajaran tidak boleh kosong"),
    nama : z.string().min(1, "Nama mata pelajaran tidak boleh kosong"),
    deskripsi : z.string().optional(),
});

export { createMataPelajaranSchema };
