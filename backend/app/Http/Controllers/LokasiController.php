<?php
namespace App\Http\Controllers;

use App\Http\Requests\LokasiRequest;
use App\Services\LokasiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LokasiController extends Controller
{
    protected $service;

    public function __construct(LokasiService $service)
    {
        $this->service = $service;
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

        $lokasi = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($lokasi, 'Data lokasi berhasil diambil');
    }

    /**
     * Tambah data lokasi baru
     */
    public function store(LokasiRequest $request): JsonResponse
    {
        $lokasi = $this->service->create($request->validated());

        return $this->successResponse($lokasi, 'Data lokasi berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail lokasi berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $lokasi = $this->service->find($id);

        return $this->successResponse($lokasi, 'Detail lokasi berhasil diambil');
    }

    /**
     * Perbarui data lokasi berdasarkan ID
     */
    public function update(LokasiRequest $request, string $id): JsonResponse
    {
        $lokasi = $this->service->update($id, $request->validated());

        return $this->successResponse($lokasi, 'Data lokasi berhasil diperbarui');
    }

    /**
     * Hapus data lokasi berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data lokasi berhasil dihapus');
    }
}
