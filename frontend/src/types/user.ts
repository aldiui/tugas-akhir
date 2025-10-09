export interface User {
    id: string
    nama: string
    role_id: string
    lokasi_id: string
    email: string
    role : string
    nomor_telepon: string
    alamat : string
    password : string
    konfirmasi_password : string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export interface CPMI {
    id: string
    nama: string
    email: string
    lokasi : string
    created_at: string
    updated_at: string
    deleted_at: string | null
}