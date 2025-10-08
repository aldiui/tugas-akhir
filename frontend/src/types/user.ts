export interface User {
    id: string
    nama: string
    email: string
    role : string
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