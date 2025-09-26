<?php
namespace App\Http\Controllers\Pengajar;

use App\Http\Controllers\Controller;
use App\Models\JadwalPelajaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengajarJadwalPelajaranController extends Controller
{
    /**
     * Ambil semua data jadwal pelajaran
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = JadwalPelajaran::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
            });
        }

        if (in_array($orderBy, ['id', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $negara = $query->paginate($perPage)->withPath('');

        return $this->successResponse($negara, 'Data jadwal pelajaran berhasil diambil');
    }

    /**
     * Tambah data jadwal pelajaran baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
        ]);

        DB::beginTransaction();
        try {
            $negara = JadwalPelajaran::create([
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($negara, 'Data jadwal pelajaran berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail jadwal pelajaran berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $negara = JadwalPelajaran::findOrFail($id);
        return $this->successResponse($negara, 'Detail jadwal pelajaran berhasil diambil');
    }

    /**
     * Perbarui data jadwal pelajaran berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
        ]);

        $negara = JadwalPelajaran::findOrFail($id);

        DB::beginTransaction();
        try {
            $negara->update([
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($negara, 'Data jadwal pelajaran berhasil diperbarui');
    }

    /**
     * Hapus data jadwal pelajaran berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $negara = JadwalPelajaran::findOrFail($id);

        DB::beginTransaction();
        try {
            $negara->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data jadwal pelajaran berhasil dihapus');
    }
}
