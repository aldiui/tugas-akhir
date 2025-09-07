<?php
namespace App\Services;

use Carbon\Carbon;
use App\Helpers\AbsensiHelper;
use App\Repositories\LokasiRepository;
use App\Repositories\AbsensiRepository;

class AbsensiService
{
    protected $absensiRepository;
    protected $lokasiRepository;

    public function __construct(AbsensiRepository $absensiRepository, LokasiRepository $lokasiRepository)
    {
        $this->absensiRepository = $absensiRepository;
        $this->lokasiRepository  = $lokasiRepository;
    }

    public function create($request)
    {
        $cpmi = auth()->user();

        if (! $cpmi || ! $cpmi->role->tipe != 'CPMI') {
            throw new \Exception('Hanya CPMI yang dapat melakukan absensi');
        }

        $lokasi = $this->lokasiRepository->findById($cpmi->lokasi_id);
        if (! $lokasi) {
            throw new \Exception('Lokasi tidak ditemukan');
        }

        $tanggal = Carbon::now()->locale('id')->format('Y-m-d');
        $jam     = Carbon::now()->locale('id')->format('H:i:s');

        $absensi = $this->absensiRepository->findByCpmiAndDate($cpmi->id, $tanggal);

        [$latitude, $longitude] = explode(",", $request->lokasi);
        $latitude               = trim($latitude);
        $longitude              = trim($longitude);

        $jamMasukMulai    = Carbon::createFromFormat('H:i:s', $lokasi->jam_masuk_mulai);
        $jamMasukSelesai  = Carbon::createFromFormat('H:i:s', $lokasi->jam_masuk_selesai);
        $jamKeluarMulai   = Carbon::createFromFormat('H:i:s', $lokasi->jam_keluar_mulai);
        $jamKeluarSelesai = Carbon::createFromFormat('H:i:s', $lokasi->jam_keluar_selesai);

        $now      = Carbon::now();
        $isKeluar = $absensi !== null;
        $isOnTime = $now->between(
            $isKeluar ? $jamKeluarMulai : $jamMasukMulai,
            $isKeluar ? $jamKeluarSelesai : $jamMasukSelesai
        );

        if (! $isKeluar && $now->lt($jamMasukMulai)) {
            throw new \Exception('Belum waktunya absensi masuk.');
        }

        if ($isKeluar && $now->lt($jamKeluarMulai)) {
            throw new \Exception('Belum waktunya absensi pulang.');
        }

        $distance = AbsensiHelper::calculateDistance($latitude, $longitude, $lokasi->latitude, $lokasi->longitude);
        $status   = $isOnTime ? 'ontime' : 'terlambat';

        if ($distance >= $lokasi->radius && ! $request->alasan) {
            $selisih = AbsensiHelper::calculateSelisihJarak($distance - $lokasi->radius);
            throw new \Exception("Anda tidak bisa melakukan absensi karena berada di luar radius lokasi ($selisih).");
        }

        if ($status === 'terlambat' && ! $absensi && ! $request->alasan) {
            $batasWaktu   = $isKeluar ? $jamKeluarMulai : $jamMasukSelesai;
            $selisihMenit = $now->diffInMinutes($batasWaktu);
            $jamTelat     = floor($selisihMenit / 60);
            $menitTelat   = $selisihMenit % 60;
            $lamaTelat    = sprintf('%02d jam %02d menit', abs($jamTelat), abs($menitTelat));
            throw new \Exception("Mohon maaf, Anda terlambat $lamaTelat. Alasan wajib diisi.");
        }

        if (! $absensi) {
            $data = [
                'cpmi_id'         => $cpmi->id,
                'tanggal'         => $tanggal,
                'jam_masuk'       => $jam,
                'latitude_masuk'  => $latitude,
                'longitude_masuk' => $longitude,
                'status_masuk'    => $status === 'terlambat' ? 'Terlambat' : 'Hadir',
                'alasan_masuk'    => $request->alasan ?? null,
            ];

            $message = $status === 'terlambat'
            ? "Absensi masuk berhasil, tapi Anda terlambat. Alasan: {$request->alasan}"
            : 'Absensi masuk berhasil. Anda datang tepat waktu.';
            $response = $this->absensiRepository->create($data);

            return [
                'data'    => $response,
                'message' => $message,
            ];
        } else {
            $data = [
                'jam_keluar'       => $jam,
                'latitude_keluar'  => $latitude,
                'longitude_keluar' => $longitude,
                'status_keluar'    => 'Hadir',
                'alasan_keluar'    => $request->alasan ?? null,
            ];
            $message = 'Absensi pulang berhasil. Semangat terus!';

            return [
                'data'    => $this->absensiRepository->update($absensi->id, $data),
                'message' => $message,
            ];
        }

    }
}
