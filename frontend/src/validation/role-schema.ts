import { z } from 'zod'

const createRoleSchema = z.object({
    nama : z.string().min(1, "Nama role tidak boleh kosong"),
    tipe : z.enum(['CPMI', 'Admin', 'Pengajar'], "Tipe role tidak valid"),
    permissions : z.array(z.string()).min(1, "Permission tidak boleh kosong"),
});

const updateRoleSchema  = z.object({
    nama : z.string().min(1, "Nama role tidak boleh kosong"),
    tipe : z.enum(['CPMI', 'Admin', 'Pengajar'], "Tipe role tidak valid"),
    permissions : z.array(z.string()).min(1, "Permission tidak boleh kosong"),
});

export { createRoleSchema, updateRoleSchema };
