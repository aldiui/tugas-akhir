<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\MataPelajaranRequest;
use App\Services\MataPelajaranService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MataPelajaranController extends Controller
{
    protected $service;

    public function __construct(MataPelajaranService $service)
    {
        $this->service = $service;
    }

    /**
     * Ambil semua data mata pelajaran
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $mataPelajaran = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diambil');
    }

    /**
     * Tambah data mata pelajaran baru
     */
    public function store(MataPelajaranRequest $request): JsonResponse
    {
        $mataPelajaran = $this->service->create($request->validated());

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail mata pelajaran berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $mataPelajaran = $this->service->find($id);

        return $this->successResponse($mataPelajaran, 'Detail mata pelajaran berhasil diambil');
    }

    /**
     * Perbarui data mata pelajaran berdasarkan ID
     */
    public function update(MataPelajaranRequest $request, string $id): JsonResponse
    {
        $mataPelajaran = $this->service->update($id, $request->validated());

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diperbarui');
    }

    /**
     * Hapus data mata pelajaran berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data mata pelajaran berhasil dihapus');
    }
}
