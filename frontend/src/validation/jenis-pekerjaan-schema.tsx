import { z } from 'zod'

const createJenisPekerjaanSchema = z.object({
    nama : z.string().min(1, "Nama jenis pekerjaan tidak boleh kosong"),
    sektor_id : z.string().min(1, "Sektor harus dipilih"),
    deskripsi : z.string().min(1, "Deskripsi jenis pekerjaan tidak boleh kosong"),
});

export { createJenisPekerjaanSchema };
