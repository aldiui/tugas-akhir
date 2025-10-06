import { z } from 'zod'

const createKelasSchema = z.object({
    pengajar_id  : z.string().min(1, "Pengajar harus dipilih"),
    lokasi_id : z.string().min(1, "Lokasi harus dipilih"),
    nama : z.string().min(1, "Nama kelas tidak boleh kosong"),
    mata_pelajaran : z.object({
        mata_pelajaran_id : z.string().min(1, "Mata pelajaran harus dipilih"),
        hari : z.enum(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'], "Hari harus dipilih"),
        jam_masuk : z.string().min(1, "Jam masuk tidak boleh kosong"),
        jam_keluar : z.string().min(1, "Jam keluar tidak boleh kosong"),
    }),
});

const updateKelasSchema = z.object({
    pengajar_id  : z.string().min(1, "Pengajar harus dipilih"),
    lokasi_id : z.string().min(1, "Lokasi harus dipilih"),
    nama : z.string().min(1, "Nama kelas tidak boleh kosong"),
    mata_pelajaran : z.object({
        id : z.string().optional(),
        mata_pelajaran_id : z.string().min(1, "Mata pelajaran harus dipilih"),
        hari : z.enum(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'], "Hari harus dipilih"),
        jam_masuk : z.string().min(1, "Jam masuk tidak boleh kosong"),
        jam_keluar : z.string().min(1, "Jam keluar tidak boleh kosong"),
    }),
});

export { createKelasSchema, updateKelasSchema };
