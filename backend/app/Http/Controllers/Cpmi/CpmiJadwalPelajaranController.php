<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Models\JadwalPelajaran;
use App\Models\Kelas;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CpmiJadwalPelajaranController extends Controller
{
    /**
     * Ambil semua data pengalaman kerja
     */
    public function index(Request $request): JsonResponse
    {
        $cpmi     = $request->user();
        $cpmiData = $cpmi->cpmiData;
        if (! $cpmiData) {
            return $this->errorResponse('Data CPMI tidak ditemukan', 404);
        }

        $kelas = Kelas::with('pengajar')->find($cpmiData->kelas_id);
        if (! $kelas) {
            return $this->errorResponse('Kelas tidak ditemukan', 404);
        }

        $hariIni = Carbon::now()->translatedFormat('l');

        $jadwalPelajaran = JadwalPelajaran::with('mataPelajaran')
            ->where('hari', $hariIni)
            ->where('kelas_id', $kelas->id)
            ->get();

        return $this->successResponse(compact('kelas', 'jadwalPelajaran'), 'Data jadwal pelajaran berhasil diambil');
    }
}
