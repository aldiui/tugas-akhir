<?php
namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $dataRole = [
            [
                'nama' => 'Admin',
                'tipe' => 'Admin',
            ],
            [
                'nama' => 'Admin Cabang',
                'tipe' => 'Admin',
            ],
            [
                'nama' => 'Pengajar',
                'tipe' => 'Pengajar',
            ],
            [
                'nama' => 'CPMI',
                'tipe' => 'CPMI',
            ],
        ];

        foreach ($dataRole as $role) {
            Role::create($role);
        }

        $dataPermission = [
            // USER
            ['kode' => 'USR_CREATE', 'nama' => 'Membuat User'],
            ['kode' => 'USR_READ', 'nama' => 'Melihat User'],
            ['kode' => 'USR_UPDATE', 'nama' => 'Mengupdate User'],
            ['kode' => 'USR_DELETE', 'nama' => 'Menghapus User'],

            // PERMISSION
            ['kode' => 'PERM_CREATE', 'nama' => 'Membuat Permission'],
            ['kode' => 'PERM_READ', 'nama' => 'Melihat Permission'],
            ['kode' => 'PERM_UPDATE', 'nama' => 'Mengupdate Permission'],
            ['kode' => 'PERM_DELETE', 'nama' => 'Menghapus Permission'],

            // ROLE
            ['kode' => 'ROL_CREATE', 'nama' => 'Membuat Role'],
            ['kode' => 'ROL_READ', 'nama' => 'Melihat Role'],
            ['kode' => 'ROL_UPDATE', 'nama' => 'Mengupdate Role'],
            ['kode' => 'ROL_DELETE', 'nama' => 'Menghapus Role'],

            // NEGARA
            ['kode' => 'NGR_CREATE', 'nama' => 'Membuat Negara'],
            ['kode' => 'NGR_READ', 'nama' => 'Melihat Negara'],
            ['kode' => 'NGR_UPDATE', 'nama' => 'Mengupdate Negara'],
            ['kode' => 'NGR_DELETE', 'nama' => 'Menghapus Negara'],

            // LOKASI
            ['kode' => 'LKS_CREATE', 'nama' => 'Membuat Lokasi'],
            ['kode' => 'LKS_READ', 'nama' => 'Melihat Lokasi'],
            ['kode' => 'LKS_UPDATE', 'nama' => 'Mengupdate Lokasi'],
            ['kode' => 'LKS_DELETE', 'nama' => 'Menghapus Lokasi'],

            // KELAS
            ['kode' => 'KLS_CREATE', 'nama' => 'Membuat Kelas'],
            ['kode' => 'KLS_READ', 'nama' => 'Melihat Kelas'],
            ['kode' => 'KLS_UPDATE', 'nama' => 'Mengupdate Kelas'],
            ['kode' => 'KLS_DELETE', 'nama' => 'Menghapus Kelas'],

            // MATA PELAJARAN
            ['kode' => 'MPL_CREATE', 'nama' => 'Membuat Mata Pelajaran'],
            ['kode' => 'MPL_READ', 'nama' => 'Melihat Mata Pelajaran'],
            ['kode' => 'MPL_UPDATE', 'nama' => 'Mengupdate Mata Pelajaran'],
            ['kode' => 'MPL_DELETE', 'nama' => 'Menghapus Mata Pelajaran'],

            // JADWAL PELAJARAN
            ['kode' => 'NOT_CREATE', 'nama' => 'Membuat Notifikasi'],
            ['kode' => 'NOT_READ', 'nama' => 'Melihat Notifikasi'],
            ['kode' => 'NOT_UPDATE', 'nama' => 'Mengupdate Notifikasi'],
            ['kode' => 'NOT_DELETE', 'nama' => 'Menghapus Notifikasi'],

            // Sektor
            ['kode' => 'SKT_CREATE', 'nama' => 'Membuat Sektor'],
            ['kode' => 'SKT_READ', 'nama' => 'Melihat Sektor'],
            ['kode' => 'SKT_UPDATE', 'nama' => 'Mengupdate Sektor'],
            ['kode' => 'SKT_DELETE', 'nama' => 'Menghapus Sektor'],

            // Jenis Pekerjaan
            ['kode' => 'JPK_CREATE', 'nama' => 'Membuat Jenis Pekerjaan'],
            ['kode' => 'JPK_READ', 'nama' => 'Melihat Jenis Pekerjaan'],
            ['kode' => 'JPK_UPDATE', 'nama' => 'Mengupdate Jenis Pekerjaan'],
            ['kode' => 'JPK_DELETE', 'nama' => 'Menghapus Jenis Pekerjaan'],

            // Izin
            ['kode' => 'IZN_CREATE', 'nama' => 'Membuat Izin'],
            ['kode' => 'IZN_READ', 'nama' => 'Melihat Izin'],
            ['kode' => 'IZN_UPDATE', 'nama' => 'Mengupdate Izin'],
            ['kode' => 'IZN_DELETE', 'nama' => 'Menghapus Izin'],

            // Keahlian
            ['kode' => 'KHL_CREATE', 'nama' => 'Membuat Keahlian'],
            ['kode' => 'KHL_READ', 'nama' => 'Melihat Keahlian'],
            ['kode' => 'KHL_UPDATE', 'nama' => 'Mengupdate Keahlian'],
            ['kode' => 'KHL_DELETE', 'nama' => 'Menghapus Keahlian'],
        ];

        foreach ($dataPermission as $permission) {
            Permission::create($permission);
        }

        $role       = Role::where('tipe', 'Admin')->get();
        $permission = Permission::all();

        foreach ($role as $item) {
            $item->permissions()->attach($permission);
        }
    }
}
