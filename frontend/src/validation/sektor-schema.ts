import { z } from 'zod'

const createSektorSchema = z.object({
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    deskripsi : z.string().min(1, "Deskripsi tidak boleh kosong"),
});

const updateSektorSchema = z.object({
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    deskripsi : z.string().min(1, "Deskripsi tidak boleh kosong"),
});

export { createSektorSchema, updateSektorSchema };
