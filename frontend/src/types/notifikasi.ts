export interface Notifikasi {
    id: string
    judul: string
    deskripsi: string
    status: string
    target: string
    cpmi_id: string[] | null
    created_at: string
    updated_at: string
    deleted_at: string | null
}