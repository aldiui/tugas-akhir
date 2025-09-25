<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Negara;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminNegaraController extends Controller
{
    /**
     * Ambil semua data negara
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Negara::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('mata_uang', 'REGEXP', $search)
                    ->orWhere('kode_mata_uang', 'REGEXP', $search)
                    ->orWhere('simbol_mata_uang', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'mata_uang', 'kode_mata_uang', 'simbol_mata_uang', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $negara = $query->paginate($perPage)->withPath('');

        return $this->successResponse($negara, 'Data negara berhasil diambil');
    }

    /**
     * Tambah data negara baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'kode'             => 'required|string|max:10|unique:negara,kode',
            'nama'             => 'required|string|max:255',
            'mata_uang'        => 'required|string|max:100',
            'kode_mata_uang'   => 'required|string|max:3',
            'simbol_mata_uang' => 'required|string|max:5',
        ]);

        DB::beginTransaction();
        try {
            $negara = Negara::create([
                'kode'             => $request->input('kode'),
                'nama'             => $request->input('nama'),
                'mata_uang'        => $request->input('mata_uang'),
                'kode_mata_uang'   => $request->input('kode_mata_uang'),
                'simbol_mata_uang' => $request->input('simbol_mata_uang'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($negara, 'Data negara berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail negara berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $negara = Negara::findOrFail($id);
        return $this->successResponse($negara, 'Detail negara berhasil diambil');
    }

    /**
     * Perbarui data negara berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'kode'             => 'required|string|max:10|unique:negara,kode,' . $id,
            'nama'             => 'required|string|max:255',
            'mata_uang'        => 'required|string|max:100',
            'kode_mata_uang'   => 'required|string|max:3',
            'simbol_mata_uang' => 'required|string|max:5',
        ]);

        $negara = Negara::findOrFail($id);

        DB::beginTransaction();
        try {
            $negara->update([
                'kode'             => $request->input('kode'),
                'nama'             => $request->input('nama'),
                'mata_uang'        => $request->input('mata_uang'),
                'kode_mata_uang'   => $request->input('kode_mata_uang'),
                'simbol_mata_uang' => $request->input('simbol_mata_uang'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($negara, 'Data negara berhasil diperbarui');
    }

    /**
     * Hapus data negara berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $negara = Negara::findOrFail($id);

        DB::beginTransaction();
        try {
            $negara->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data negara berhasil dihapus');
    }
}
