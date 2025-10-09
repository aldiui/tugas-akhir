<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sektor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminSektorController extends Controller
{
    /**
     * Ambil semua data sektor
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Sektor::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('deskripsi', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'deskripsi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $sektor = $query->paginate($perPage)->withPath('');

        return $this->successResponse($sektor, 'Data sektor berhasil diambil');
    }

    /**
     * Tambah data sektor baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'      => 'required|string|max:255|unique:sektor,nama',
            'deskripsi' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $sektor = Sektor::create([
                'nama'      => $request->input('nama'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($sektor, 'Data sektor berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail sektor berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $sektor = Sektor::findOrFail($id);
        return $this->successResponse($sektor, 'Detail sektor berhasil diambil');
    }

    /**
     * Perbarui data sektor berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'nama'      => 'required|string|max:255|unique:sektor,nama,' . $id,
            'deskripsi' => 'required|string',
        ]);

        $sektor = Sektor::findOrFail($id);

        DB::beginTransaction();
        try {
            $sektor->update([
                'nama'      => $request->input('nama'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($sektor, 'Data sektor berhasil diperbarui');
    }

    /**
     * Hapus data sektor berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $sektor = Sektor::findOrFail($id);

        if ($sektor->jenisPekerjaan()->count() > 0) {
            return $this->errorResponse('Sektor tidak dapat dihapus karena sedang digunakan', 400);
        }

        DB::beginTransaction();
        try {
            $sektor->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data sektor berhasil dihapus');
    }
}
