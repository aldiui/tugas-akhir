<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\KelasRequest;
use App\Services\KelasService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    protected $service;

    public function __construct(KelasService $service)
    {
        $this->service = $service;
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

        $kelas = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($kelas, 'Data kelas berhasil diambil');
    }

    /**
     * Tambah data kelas baru
     */
    public function store(KelasRequest $request): JsonResponse
    {
        $kelas = $this->service->create($request->validated());

        return $this->successResponse($kelas, 'Data kelas berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail kelas berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $kelas = $this->service->find($id);

        return $this->successResponse($kelas, 'Detail kelas berhasil diambil');
    }

    /**
     * Perbarui data kelas berdasarkan ID
     */
    public function update(KelasRequest $request, string $id): JsonResponse
    {
        $kelas = $this->service->update($id, $request->validated());

        return $this->successResponse($kelas, 'Data kelas berhasil diperbarui');
    }

    /**
     * Hapus data kelas berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data kelas berhasil dihapus');
    }
}
