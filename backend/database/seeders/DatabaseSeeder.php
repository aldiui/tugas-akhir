<?php
namespace Database\Seeders;

use Database\Seeders\JenisPekerjaanSeeder;
use Database\Seeders\KeahlianSeeder;
use Database\Seeders\LokasiSeeder;
use Database\Seeders\MataPelajaranSeeder;
use Database\Seeders\NegaraSeeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\SektorSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(NegaraSeeder::class);
        $this->call(LokasiSeeder::class);
        $this->call(MataPelajaranSeeder::class);
        $this->call(SektorSeeder::class);
        $this->call(JenisPekerjaanSeeder::class);
    }
}
