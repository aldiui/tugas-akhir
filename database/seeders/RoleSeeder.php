<?php
namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
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
                'tipe' => 'Admin',
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
            [
                'kode' => 'CRUSR',
                'nama' => 'Membuat User',
            ],
            [
                'kode' => 'RUSR',
                'nama' => 'Melihat User',
            ],
            [
                'kode' => 'UUSR',
                'nama' => 'Mengupdate User',
            ],
            [
                'kode' => 'DUSR',
                'nama' => 'Menghapus User',
            ],
            [
                'kode' => 'CRPRM',
                'nama' => 'Membuat Permission',
            ],
            [
                'kode' => 'RPRM',
                'nama' => 'Melihat Permission',
            ],
            [
                'kode' => 'UPRM',
                'nama' => 'Mengupdate Permission',
            ],
            [
                'kode' => 'DPRM',
                'nama' => 'Menghapus Permission',
            ],
            [
                'kode' => 'CRROL',
                'nama' => 'Membuat Role',
            ],
            [
                'kode' => 'RROL',
                'nama' => 'Melihat Role',
            ],
            [
                'kode' => 'UROL',
                'nama' => 'Mengupdate Role',
            ],
            [
                'kode' => 'DROL',
                'nama' => 'Menghapus Role',
            ],
            [
                'kode' => 'CRNGR',
                'nama' => 'Membuat Negara',
            ],
            [
                'kode' => 'RNGR',
                'nama' => 'Melihat Negara',
            ],
            [
                'kode' => 'UNGR',
                'nama' => 'Mengupdate Negara',
            ],
            [
                'kode' => 'DNGR',
                'nama' => 'Menghapus Negara',
            ],
            [
                'kode' => 'CRLKS',
                'nama' => 'Membuat Lokasi',
            ],
            [
                'kode' => 'RLKS',
                'nama' => 'Melihat Lokasi',
            ],
            [
                'kode' => 'ULKS',
                'nama' => 'Mengupdate Lokasi',
            ],
            [
                'kode' => 'DLKS',
                'nama' => 'Menghapus Lokasi',
            ],
            [
                'kode' => 'CRKLS',
                'nama' => 'Membuat Kelas',
            ],
            [
                'kode' => 'RKLS',
                'nama' => 'Melihat Kelas',
            ],
            [
                'kode' => 'UKLS',
                'nama' => 'Mengupdate Kelas',
            ],
            [
                'kode' => 'DKLS',
                'nama' => 'Menghapus Kelas',
            ],
            [
                'kode' => 'CRMPL',
                'nama' => 'Membuat Mata Pelajaran',
            ],
            [
                'kode' => 'RMPL',
                'nama' => 'Melihat Mata Pelajaran',
            ],
            [
                'kode' => 'UMPL',
                'nama' => 'Mengupdate Mata Pelajaran',
            ],
            [
                'kode' => 'DMPL',
                'nama' => 'Menghapus Mata Pelajaran',
            ],

            [
                'kode' => 'CRJLP',
                'nama' => 'Membuat Jadwal Pelajaran',
            ],
            [
                'kode' => 'RJLP',
                'nama' => 'Melihat Jadwal Pelajaran',
            ],
            [
                'kode' => 'UJLP',
                'nama' => 'Mengupdate Jadwal Pelajaran',
            ],
            [
                'kode' => 'DJLP',
                'nama' => 'Menghapus Jadwal Pelajaran',
            ],
        ];

        foreach ($dataPermission as $permission) {
            Permission::create($permission);
        }

        $role = Role::where('tipe', 'Admin')->get();
        $permission = Permission::all();

        foreach ($role as $item) {
            $item->permissions()->attach($permission);
        }
    }
}
