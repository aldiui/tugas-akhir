import { z } from 'zod'

const createMataPelajaranSchema = z.object({
    kode : z.string().min(1, "Kode tidak boleh kosong"),
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    deskripsi : z.string().optional(),
});

const updateMataPelajaranSchema = z.object({
    kode : z.string().min(1, "Kode tidak boleh kosong"),
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    deskripsi : z.string().optional(),
});

export { createMataPelajaranSchema, updateMataPelajaranSchema };
