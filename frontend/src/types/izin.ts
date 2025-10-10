export interface Izin {
  id: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  keterangan: string;
  dokumen: string[];
  cpmi_id: string;
  cpmi: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
