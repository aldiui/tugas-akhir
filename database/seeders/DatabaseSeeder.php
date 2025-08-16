<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\LokasiSeeder;
use Database\Seeders\NegaraSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(NegaraSeeder::class);
        $this->call(LokasiSeeder::class);
    }
}
