<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLokasiRequest;
use App\Services\LokasiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminLokasiController extends Controller
{
    protected $lokasiService;

    public function __construct(LokasiService $lokasiService)
    {
        $this->lokasiService = $lokasiService;
    }

    /**
     * Ambil semua data lokasi
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $lokasi = $this->lokasiService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($lokasi, 'Data lokasi berhasil diambil');
    }

    /**
     * Tambah data lokasi baru
     */
    public function store(AdminLokasiRequest $request): JsonResponse
    {
        $lokasi = $this->lokasiService->create($request->validated());

        return $this->successResponse($lokasi, 'Data lokasi berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail lokasi berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $lokasi = $this->lokasiService->find($id);

        return $this->successResponse($lokasi, 'Detail lokasi berhasil diambil');
    }

    /**
     * Perbarui data lokasi berdasarkan ID
     */
    public function update(AdminLokasiRequest $request, string $id): JsonResponse
    {
        $lokasi = $this->lokasiService->update($id, $request->validated());

        return $this->successResponse($lokasi, 'Data lokasi berhasil diperbarui');
    }

    /**
     * Hapus data lokasi berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->lokasiService->delete($id);

        return $this->successResponse(null, 'Data lokasi berhasil dihapus');
    }
}
