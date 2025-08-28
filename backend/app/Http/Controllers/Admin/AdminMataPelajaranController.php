<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminMataPelajaranRequest;
use App\Services\MataPelajaranService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMataPelajaranController extends Controller
{
    protected $mataPelajaranService;

    public function __construct(MataPelajaranService $mataPelajaranService)
    {
        $this->mataPelajaranService = $mataPelajaranService;
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

        $mataPelajaran = $this->mataPelajaranService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diambil');
    }

    /**
     * Tambah data mata pelajaran baru
     */
    public function store(AdminMataPelajaranRequest $request): JsonResponse
    {
        $mataPelajaran = $this->mataPelajaranService->create($request->validated());

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail mata pelajaran berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $mataPelajaran = $this->mataPelajaranService->find($id);

        return $this->successResponse($mataPelajaran, 'Detail mata pelajaran berhasil diambil');
    }

    /**
     * Perbarui data mata pelajaran berdasarkan ID
     */
    public function update(AdminMataPelajaranRequest $request, string $id): JsonResponse
    {
        $mataPelajaran = $this->mataPelajaranService->update($id, $request->validated());

        return $this->successResponse($mataPelajaran, 'Data mata pelajaran berhasil diperbarui');
    }

    /**
     * Hapus data mata pelajaran berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->mataPelajaranService->delete($id);

        return $this->successResponse(null, 'Data mata pelajaran berhasil dihapus');
    }
}
