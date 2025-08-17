<?php
namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin       = Role::where('nama', 'Admin')->first();
        $adminCabang = Role::where('nama', 'Admin Cabang')->first();
        $pengajar    = Role::where('nama', 'Pengajar')->first();
        $cpmi        = Role::where('nama', 'CPMI')->first();

        User::create([
            'nama'     => 'Admin',
            'email'    => 'admin@test.com',
            'password' => bcrypt('11221122'),
            'role_id'  => $admin->id,
        ]);

        User::create([
            'nama'     => 'Admin Cabang',
            'email'    => 'admincabang@test.com',
            'password' => bcrypt('11221122'),
            'role_id'  => $adminCabang->id,
        ]);

        User::create([
            'nama'     => 'Pengajar',
            'email'    => 'pengajar@test.com',
            'password' => bcrypt('11221122'),
            'role_id'  => $pengajar->id,
        ]);

        User::create([
            'nama'     => 'CPMI',
            'email'    => 'cpmi@test.com',
            'password' => bcrypt('11221122'),
            'role_id'  => $cpmi->id,
        ]);
    }
}
