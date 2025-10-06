import { z } from 'zod'

const createSektorSchema = z.object({
    nama : z.string().min(1, "Nama sektor tidak boleh kosong"),
    deskripsi : z.string().min(1, "Deskripsi sektor tidak boleh kosong"),
});

export { createSektorSchema };
