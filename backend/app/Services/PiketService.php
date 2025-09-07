<?php
namespace App\Services;

use Carbon\Carbon;
use App\Helpers\AbsensiHelper;
use App\Repositories\LokasiRepository;
use App\Repositories\AbsensiRepository;

class PiketService
{
    protected $piketRepository;

    public function __construct(PiketRepository $piketRepository)
    {
        $this->piketRepository = $piketRepository;
    }

    public function create(array $data)
    {
        $cpmi = auth()->user();

        if (! $cpmi || ! $cpmi->role->tipe != 'CPMI') {
            throw new \Exception('Hanya CPMI yang dapat melakukan piket.');
        }

        $tanggal = Carbon::now()->locale('id')->format('Y-m-d');

        $piket = $this->piketRepository->findByCpmiAndDate($cpmi->id, $tanggal);

        if (! $piket) {
            $dataPiket = [
                'user_id'        => $cpmi->id,
                'tanggal'        => $tanggal,
                'jam_mulai'      => $data['jam_mulai'] ?? null,
                'jam_selesai'    => $data['jam_selesai'] ?? null,
                'kegiatan'       => $data['kegiatan'] ?? null,
                'foto_kegiatan'  => $data['foto_kegiatan'] ?? null,
            ];

            return $this->piketRepository->create($dataPiket);
        } else {
            throw new \Exception('Anda sudah melakukan piket hari ini.');
        }

    }
}
