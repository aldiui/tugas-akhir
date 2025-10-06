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
     * Ambil semua data piket
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $cpmi  = $request->user();
        $query = Piket::query();
        $query->where('cpmi_id', $cpmi->id);
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tanggal', 'REGEXP', $search)
                    ->orWhere('jam_masuk', 'REGEXP', $search)
                    ->orWhere('jam_keluar', 'REGEXP', $search)
                    ->orWhere('kegiatan', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'tanggal', 'jam_masuk', 'jam_keluar', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $piket = $query->paginate($perPage)->withPath('');

        return $this->successResponse($piket, 'Data piket berhasil diambil');
    }

    /**
     * Tambah data piket baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jam_masuk'  => 'required|date_format:H:i',
            'jam_keluar' => 'required|date_format:H:i|after:jam_masuk',
            'kegiatan'   => 'required|string',
        ]);

        $cpmi    = $request->user();
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
                'user_id'    => $user->id,
                'tanggal'    => $tanggal,
                'jam_masuk'  => $request->input('jam_masuk'),
                'jam_keluar' => $request->input('jam_keluar'),
                'kegiatan'   => $request->input('kegiatan'),
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }

        return $this->successResponse($piket, 'Data piket berhasil ditambahkan', 201);
    }
}
