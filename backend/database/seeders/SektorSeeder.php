<?php
namespace Database\Seeders;

use App\Models\Sektor;
use Illuminate\Database\Seeder;

class SektorSeeder extends Seeder
{
    /**
     * Run the database seeds
     */
    public function run(): void
    {
        $sektor = [
            [
                'nama'      => 'Formal',
                'deskripsi' => 'Sektor Formal',
            ],
            [
                'nama'      => 'Informal',
                'deskripsi' => 'Sektor Informal',
            ],
        ];

        foreach ($sektor as $sector) {
            Sektor::create($sector);
        }
    }
}
