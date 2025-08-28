<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminKelasRequest;
use App\Services\KelasService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminKelasController extends Controller
{
    protected $kelasService;

    public function __construct(KelasService $kelasService)
    {
        $this->kelasService = $kelasService;
    }

    /**
     * Ambil semua data kelas
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $kelas = $this->kelasService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($kelas, 'Data kelas berhasil diambil');
    }

    /**
     * Tambah data kelas baru
     */
    public function store(AdminKelasRequest $request): JsonResponse
    {
        $kelas = $this->kelasService->create($request->validated());

        return $this->successResponse($kelas, 'Data kelas berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail kelas berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $kelas = $this->kelasService->find($id);

        return $this->successResponse($kelas, 'Detail kelas berhasil diambil');
    }

    /**
     * Perbarui data kelas berdasarkan ID
     */
    public function update(AdminKelasRequest $request, string $id): JsonResponse
    {
        $kelas = $this->kelasService->update($id, $request->validated());

        return $this->successResponse($kelas, 'Data kelas berhasil diperbarui');
    }

    /**
     * Hapus data kelas berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->kelasService->delete($id);

        return $this->successResponse(null, 'Data kelas berhasil dihapus');
    }
}
