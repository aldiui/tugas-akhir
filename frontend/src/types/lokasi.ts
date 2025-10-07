export interface Lokasi {
    id: string
    kode: string
    nama : string
    latitude : number
    longitude : number
    jam_masuk_mulai : string
    jam_masuk_selesai : string
    jam_keluar_mulai : string
    jam_keluar_selesai : string
    radius : number
    alamat : string
    telepon : string
    created_at: string
    updated_at: string
    deleted_at: string | null
}