import { z } from 'zod'

const createNegaraSchema = z.object({
    kode : z.string().min(1, "Kode tidak boleh kosong"),
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    mata_uang : z.string().min(1, "Mata uang tidak boleh kosong"),
    kode_mata_uang : z.string().min(1, "Kode mata uang tidak boleh kosong"),
    simbol_mata_uang : z.string().min(1, "Simbol mata uang tidak boleh kosong"),
});

const updateNegaraSchema = z.object({
    kode : z.string().min(1, "Kode tidak boleh kosong"),
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    mata_uang : z.string().min(1, "Mata uang tidak boleh kosong"),
    kode_mata_uang : z.string().min(1, "Kode mata uang tidak boleh kosong"),
    simbol_mata_uang : z.string().min(1, "Simbol mata uang tidak boleh kosong"),
});

export { createNegaraSchema, updateNegaraSchema };
