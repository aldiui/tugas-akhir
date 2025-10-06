<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Models\Izin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CpmiIzinController extends Controller
{
    /**
     * Ambil semua data izin
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $cpmi  = $request->user();
        $query = Izin::query();
        $query->where('cpmi_id', $cpmi->id);
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tanggal_mulai', 'REGEXP', $search)
                    ->orWhere('tanggal_selesai', 'REGEXP', $search)
                    ->orWhere('keterangan', 'REGEXP', $search)
                    ->orWhere('status', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'tanggal_mulai', 'tanggal_selesai', 'keterangan', 'status', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $izin = $query->paginate($perPage)->withPath('');

        return $this->successResponse($izin, 'Data izin berhasil diambil');
    }

    /**
     * Tambah data izin baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'keterangan'      => 'required|string',
            'dokumen'         => 'nullable|array',
        ]);

        $cpmi = $request->user();

        $checkIzin = Izin::where('cpmi_id', $cpmi->id)
            ->where('tanggal_mulai', $request->input('tanggal_mulai'))
            ->where('tanggal_selesai', $request->input('tanggal_selesai'))
            ->first();

        if ($checkIzin) {
            return $this->errorResponse('Anda sudah melakukan izin pada tanggal tersebut.', 400);
        }

        DB::beginTransaction();
        try {
            $izin = Izin::create([
                'cpmi_id'         => $cpmi->id,
                'tanggal_mulai'   => $request->input('tanggal_mulai'),
                'tanggal_selesai' => $request->input('tanggal_selesai'),
                'keterangan'      => $request->input('keterangan'),
                'dokumen'         => $request->input('dokumen'),
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
        }

        return $this->successResponse($piket, 'Data piket berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail izin berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $cpmi = auth()->user();
        $izin = Izin::where('id', $id)
            ->where('cpmi_id', $cpmi->id)
            ->firstOrFail();

        return $this->successResponse($izin, 'Detail izin berhasil diambil');
    }
}
