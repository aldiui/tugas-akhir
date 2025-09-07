<?php
namespace App\Repositories;

use App\Models\Piket;
use Illuminate\Support\Facades\DB;

class PiketRepository
{
    protected $piketModel;

    public function __construct(Piket $piketModel)
    {
        $this->piketModel = $piketModel;
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $absensi = $this->piketModel->create([
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

    public function findByCpmiAndDate($cpmiId, $tanggal)
    {
        return $this->piketModel->where('cpmi_id', $cpmiId)
            ->where('tanggal', $tanggal)
            ->first();
    }
}
