<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPekerjaan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminJenisPekerjaanController extends Controller
{
    /**
     * Ambil semua data jenis pekerjaan
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = JenisPekerjaan::select(
            'jenis_pekerjaan.id as id',
            'jenis_pekerjaan.nama as nama',
            'jenis_pekerjaan.sektor_id as sektor_id',
            'jenis_pekerjaan.deskripsi as deskripsi',
            'jenis_pekerjaan.created_at as created_at',
            'jenis_pekerjaan.updated_at as updated_at',
            'sektor.nama as sektor'
        )->join('sektor', 'jenis_pekerjaan.sektor_id', '=', 'sektor.id');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('jenis_pekerjaan.nama', 'REGEXP', $search)
                    ->orWhere('jenis_pekerjaan.deskripsi', 'REGEXP', $search)
                    ->orWhere('sektor.nama', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'sektor', 'deskripsi', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $jenisPekerjaan = $query->paginate($perPage)->withPath('');

        return $this->successResponse($jenisPekerjaan, 'Data jenis pekerjaan berhasil diambil');
    }

    /**
     * Tambah data jenis pekerjaan baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'      => 'required|string|max:255|unique:jenis_pekerjaan,nama',
            'sektor_id' => 'required|exists:sektor,id',
            'deskripsi' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $jenisPekerjaan = JenisPekerjaan::create([
                'nama'      => $request->input('nama'),
                'sektor_id' => $request->input('sektor_id'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($jenisPekerjaan, 'Data jenis pekerjaan berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail jenis pekerjaan berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $jenisPekerjaan = JenisPekerjaan::findOrFail($id);
        return $this->successResponse($jenisPekerjaan, 'Detail jenis pekerjaan berhasil diambil');
    }

    /**
     * Perbarui data jenis pekerjaan berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'nama'      => 'required|string|max:255|unique:jenis_pekerjaan,nama,' . $id,
            'sektor_id' => 'required|exists:sektor,id',
            'deskripsi' => 'required|string',
        ]);

        $jenisPekerjaan = JenisPekerjaan::findOrFail($id);

        DB::beginTransaction();
        try {
            $jenisPekerjaan->update([
                'nama'      => $request->input('nama'),
                'sektor_id' => $request->input('sektor_id'),
                'deskripsi' => $request->input('deskripsi'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($jenisPekerjaan, 'Data jenis pekerjaan berhasil diperbarui');
    }

    /**
     * Hapus data jenis pekerjaan berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $jenisPekerjaan = JenisPekerjaan::findOrFail($id);

        DB::beginTransaction();
        try {
            $jenisPekerjaan->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data jenis pekerjaan berhasil dihapus');
    }
}
