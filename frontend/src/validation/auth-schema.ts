import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email("Alamat email tidak valid"),
    password: z.string().min(8, "Kata sandi harus minimal 8 karakter")
});

const registerSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    email: z.string().email("Alamat email tidak valid"),
    telepon : z.string().min(10, "Nomor telepon tidak valid").max(15, "Nomor telepon tidak valid"),
    jenis_kelamin : z.enum(['Laki-laki', 'Perempuan'], "Jenis kelamin harus dipilih"),
    alamat : z.string().min(1, "Alamat tidak boleh kosong"),
    nik : z.string().min(16, "NIK tidak valid").max(16, "NIK tidak valid"),
    lokasi_id : z.string().min(1, "Lokasi harus dipilih"),
    negara_id : z.string().min(1, "Negara harus dipilih"),
password : z.string().min(8, "Password harus minimal 8 karakter"),
    konfirmasi_password : z.string().min(8, "Konfirmasi password harus minimal 8 karakter"),
}).refine((data) => data.password === data.konfirmasi_password, {
    message: "Password dan konfirmasi password harus sama",
    path: ["konfirmasi_password"],
});


export { loginSchema, registerSchema };
