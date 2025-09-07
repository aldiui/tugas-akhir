<?php
namespace App\Repositories;

use App\Models\Absensi;
use Illuminate\Support\Facades\DB;

class AbsensiRepository
{
    protected $absensiModel;

    public function __construct(Absensi $absensiModel)
    {
        $this->absensiModel = $absensiModel;
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $absensi = $this->absensiModel->create([
                'cpmi_id'   => $data['cpmi_id'],
                'tanggal'   => $data['tanggal'],
                'jam_masuk' => $data['jam_masuk'],
                'latitude_masuk'  => $data['latitude_masuk'],
                'longitude_masuk' => $data['longitude_masuk'],
                'status_masuk'    => $data['status_masuk'],
                'alasan_masuk'    => $data['alasan_masuk'],
            ]);
            DB::commit();
            return $absensi;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $absensi = $this->absensiModel->find($id);
            $absensi->update([
                'jam_keluar'       => $data['jam_keluar'],
                'latitude_keluar'  => $data['latitude_keluar'],
                'longitude_keluar' => $data['longitude_keluar'],
                'status_keluar'    => $data['status_keluar'],
                'alasan_keluar'    => $data['alasan_keluar'],
            ]);
            DB::commit();
            return $absensi;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function findByCpmiAndDate($cpmiId, $tanggal)
    {
        return $this->absensiModel->where('cpmi_id', $cpmiId)
            ->where('tanggal', $tanggal)
            ->first();
    }
}
