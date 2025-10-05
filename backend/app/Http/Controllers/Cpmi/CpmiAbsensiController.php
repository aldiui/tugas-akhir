<?php
namespace App\Http\Controllers\Cpmi;

use App\Helpers\AbsensiHelper;
use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\Lokasi;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CpmiAbsensiController extends Controller
{
    /**
     * Ambil semua data absensi
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $cpmi  = $request->user();
        $query = Absensi::query();
        $query->where('cpmi_id', $cpmi->id);
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tanggal', 'REGEXP', $search)
                    ->orWhere('jam_masuk', 'REGEXP', $search)
                    ->orWhere('jam_keluar', 'REGEXP', $search)
                    ->orWhere('status_masuk', 'REGEXP', $search)
                    ->orWhere('status_keluar', 'REGEXP', $search)
                    ->orWhere('alasan_masuk', 'REGEXP', $search)
                    ->orWhere('alasan_keluar', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'tanggal', 'jam_masuk', 'jam_keluar', 'status_masuk', 'status_keluar', 'alasan_masuk', 'alasan_keluar', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $absensi = $query->paginate($perPage)->withPath('');

        return $this->successResponse($absensi, 'Data absensi berhasil diambil');
    }

    /**
     * Tambah data absensi baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'lokasi' => 'required|string',
            'alasan' => 'nullable|string',
        ]);

        $cpmi   = $request->user();
        $lokasi = Lokasi::find($cpmi->lokasi_id);

        $tanggal = Carbon::now()->locale('id')->format('Y-m-d');
        $jam     = Carbon::now()->locale('id')->format('H:i:s');

        $absensi = Absensi::where('cpmi_id', $cpmi->id)
            ->whereDate('tanggal', $tanggal)
            ->first();

        [$latitude, $longitude] = explode(",", $request->input('lokasi'));
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
            return $this->errorResponse('Belum waktunya absensi masuk.', 400);
        }

        if ($isKeluar && $now->lt($jamKeluarMulai)) {
            return $this->errorResponse('Belum waktunya absensi pulang.', 400);
        }

        $distance = AbsensiHelper::calculateDistance($latitude, $longitude, $lokasi->latitude, $lokasi->longitude);
        $status   = $isOnTime ? 'ontime' : 'terlambat';

        if ($distance >= $lokasi->radius && ! $request->alasan) {
            $selisih = AbsensiHelper::calculateSelisihJarak($distance - $lokasi->radius);
            return $this->errorResponse("Anda berada di luar radius lokasi absensi. Jarak Anda dari titik lokasi adalah {$selisih} meter. Silakan berikan alasan untuk melanjutkan absensi.", 400);
        }

        if ($status === 'terlambat' && ! $absensi && ! $request->alasan) {
            $batasWaktu   = $isKeluar ? $jamKeluarMulai : $jamMasukSelesai;
            $selisihMenit = $now->diffInMinutes($batasWaktu);
            $jamTelat     = floor($selisihMenit / 60);
            $menitTelat   = $selisihMenit % 60;
            $lamaTelat    = sprintf('%02d jam %02d menit', abs($jamTelat), abs($menitTelat));
            return $this->errorResponse("Anda terlambat melakukan absensi masuk selama {$lamaTelat}. Silakan berikan alasan untuk melanjutkan absensi.", 400);
        }

        DB::beginTransaction();
        try {
            if (! $absensi) {
                $absensi = Absensi::create([
                    'cpmi_id'         => $cpmi->id,
                    'tanggal'         => $tanggal,
                    'jam_masuk'       => $jam,
                    'status_masuk'    => $status === 'terlambat' ? 'Terlambat' : 'Hadir',
                    'latitude_masuk'  => $latitude,
                    'longitude_masuk' => $longitude,
                    'alasan_masuk'    => $request->input('alasan') ?? null,
                ]);

                $message = $status === 'terlambat'
                    ? 'Anda terlambat melakukan absensi masuk. Terima kasih telah memberikan alasan.'
                    : 'Absensi masuk berhasil. Terima kasih telah melakukan absensi.';

                return $this->successResponse($absensi, $message, 201);
            } else if ($isKeluar && ! $absensi->jam_keluar) {
                $absensi->update([
                    'jam_keluar'       => $jam,
                    'status_keluar'    => 'Hadir',
                    'latitude_keluar'  => $latitude,
                    'longitude_keluar' => $longitude,
                    'alasan_keluar'    => $request->input('alasan') ?? null,
                ]);

                $message = 'Absensi pulang berhasil. Semangat terus!';

                return $this->successResponse($absensi, $message, 200);
            }
            DB::commit();
            return $this->errorResponse('Anda sudah melakukan absensi masuk dan pulang hari ini.', 400);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
