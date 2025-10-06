<?php
namespace Database\Seeders;

use App\Models\Sektor;
use App\Models\JenisPekerjaan;
use Illuminate\Database\Seeder;

class JenisPekerjaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sektorFormal    = Sektor::where('nama', 'Formal')->first();
        $sektorInFormal = Sektor::where('nama', 'Informal')->first();
        $jenisPekerjaan  = [
            ['nama' => 'Jasa Umum', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '服務業'],
            ['nama' => 'Panti Jompo / Institusi Kesehatan', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '機構看護工'],
            ['nama' => 'Pabrik / Manufaktur', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '製造業'],
            ['nama' => 'Asisten Rumah Tangga', 'sektor_id' => $sektorInFormal->id, 'deskripsi' => '家庭幫傭'],
            ['nama' => 'Caregiver / Perawat', 'sektor_id' => $sektorInFormal->id, 'deskripsi' => '家庭看護工'],
            ['nama' => 'Perikanan', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '漁業'],
            ['nama' => 'Pertanian', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '農業'],
            ['nama' => 'Konstruksi', 'sektor_id' => $sektorFormal->id, 'deskripsi' => '營造業'],
        ];

        foreach ($jenisPekerjaan as $jp) {
            JenisPekerjaan::create($jp);
        }
    }
}
