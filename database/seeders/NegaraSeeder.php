<?php
namespace Database\Seeders;

use App\Models\Negara;
use Illuminate\Database\Seeder;

class NegaraSeeder extends Seeder
{
    public function run(): void
    {
        $negara = [
            [
                'kode'             => 'TWN',
                'nama'             => 'Taiwan',
                'mata_uang'        => 'New Taiwan Dollar',
                'kode_mata_uang'   => 'TWD',
                'simbol_mata_uang' => 'NT$',
            ],
            [
                'kode'             => 'DMA',
                'nama'             => 'Dominika',
                'mata_uang'        => 'East Caribbean Dollar',
                'kode_mata_uang'   => 'XCD',
                'simbol_mata_uang' => 'EC$',
            ],
        ];

        foreach ($negara as $country) {
            Negara::create($country);
        }
    }
}
