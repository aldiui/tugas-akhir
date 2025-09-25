<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Models\Piket;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CpmiPiketController extends Controller
{
    /**
     * Tambah data piket baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jam_mulai'       => 'required|date_format:H:i',
            'jam_selesai'     => 'required|date_format:H:i|after:jam_mulai',
            'kegiatan'        => 'required|string',
            'foto_kegiatan'   => 'nullable|array',
            'foto_kegiatan.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $cpmi = $request->user();

        if (! $cpmi || $cpmi->role->tipe !== 'CPMI') {
            return $this->errorResponse('Akses ditolak. Hanya CPMI yang dapat melakukan aksi ini.', 403);
        }

        $tanggal = Carbon::now()->locale('id')->format('Y-m-d');

        $checkPiket = Piket::where('user_id', $user->id)
            ->where('tanggal', $tanggal)
            ->first();

        if ($checkPiket) {
            return $this->errorResponse('Anda sudah melakukan piket hari ini.', 400);
        }

        DB::beginTransaction();
        try {
            $piket = Piket::create([
                'user_id'     => $user->id,
                'tanggal'     => $tanggal,
                'jam_mulai'   => $request->input('jam_mulai'),
                'jam_selesai' => $request->input('jam_selesai'),
                'kegiatan'    => $request->input('kegiatan'),
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }

        return $this->successResponse($piket, 'Data piket berhasil ditambahkan', 201);
    }
}
