<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MataPelajaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminMataPelajaranController extends Controller
{
    /**
     * Ambil semua data mata pelajaran
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = MataPelajaran::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('deskripsi', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'deskripsi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $mataPelajaran = $query->paginate($perPage)->withPath('');

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diambil');
    }

    /**
     * Tambah data mata pelajaran baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'kode'      => 'required|string|max:50|unique:mata_pelajaran,kode',
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $mataPelajaran = MataPelajaran::create([
                'kode'      => $request->input('kode'),
                'nama'      => $request->input('nama'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail mata pelajaran berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $mataPelajaran = MataPelajaran::findOrFail($id);
        return $this->successResponse($mataPelajaran, 'Detail mata pelajaran berhasil diambil');
    }

    /**
     * Perbarui data mata pelajaran berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'kode'      => 'required|string|max:50|unique:mata_pelajaran,kode,' . $id,
            'nama'      => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $mataPelajaran = MataPelajaran::findOrFail($id);

        DB::beginTransaction();
        try {
            $mataPelajaran->update([
                'kode'      => $request->input('kode'),
                'nama'      => $request->input('nama'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diperbarui');
    }

    /**
     * Hapus data mata pelajaran berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $mataPelajaran = MataPelajaran::findOrFail($id);

        DB::beginTransaction();
        try {
            $mataPelajaran->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data mata pelajaran berhasil dihapus');
    }
}
