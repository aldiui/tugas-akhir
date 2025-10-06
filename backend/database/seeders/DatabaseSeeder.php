<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\LokasiSeeder;
use Database\Seeders\NegaraSeeder;
use Database\Seeders\SektorSeeder;
use Database\Seeders\MataPelajaranSeeder;
use Database\Seeders\JenisPekerjaanSeeder;

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
