<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\NegaraRequest;
use App\Services\NegaraService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NegaraController extends Controller
{
    protected $service;

    public function __construct(NegaraService $service)
    {
        $this->service = $service;
    }

    /**
     * Ambil semua data negara
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $negara = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($negara, 'Data negara berhasil diambil');
    }

    /**
     * Tambah data negara baru
     */
    public function store(NegaraRequest $request): JsonResponse
    {
        $negara = $this->service->create($request->validated());

        return $this->successResponse($negara, 'Data negara berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail negara berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $negara = $this->service->find($id);

        return $this->successResponse($negara, 'Detail negara berhasil diambil');
    }

    /**
     * Perbarui data negara berdasarkan ID
     */
    public function update(NegaraRequest $request, string $id): JsonResponse
    {
        $negara = $this->service->update($id, $request->validated());

        return $this->successResponse($negara, 'Data negara berhasil diperbarui');
    }

    /**
     * Hapus data negara berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data negara berhasil dihapus');
    }
}
