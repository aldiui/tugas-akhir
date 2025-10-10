export interface Role {
  id: string;
  nama: string;
  tipe: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
