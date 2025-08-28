<?php
namespace App\Repositories;

use App\Models\Absensi;
use Illuminate\Support\Facades\DB;

class AbsensiRepository
{
    protected $model;

    public function __construct(Absensi $model)
    {
        $this->model = $model;
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $absensi = $this->model->create([
                'user_id'   => $data['user_id'],
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
            $absensi = $this->model->find($id);
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

    public function findByUserAndDate($userId, $tanggal)
    {
        return $this->model->where('user_id', $userId)
            ->where('tanggal', $tanggal)
            ->first();
    }
}
