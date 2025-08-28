<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminNegaraRequest;
use App\Services\NegaraService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminNegaraController extends Controller
{
    protected $negaraService;

    public function __construct(NegaraService $negaraService)
    {
        $this->negaraService = $negaraService;
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

        $negara = $this->negaraService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($negara, 'Data negara berhasil diambil');
    }

    /**
     * Tambah data negara baru
     */
    public function store(AdminNegaraRequest $request): JsonResponse
    {
        $negara = $this->negaraService->create($request->validated());

        return $this->successResponse($negara, 'Data negara berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail negara berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $negara = $this->negaraService->find($id);

        return $this->successResponse($negara, 'Detail negara berhasil diambil');
    }

    /**
     * Perbarui data negara berdasarkan ID
     */
    public function update(AdminNegaraRequest $request, string $id): JsonResponse
    {
        $negara = $this->negaraService->update($id, $request->validated());

        return $this->successResponse($negara, 'Data negara berhasil diperbarui');
    }

    /**
     * Hapus data negara berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->negaraService->delete($id);

        return $this->successResponse(null, 'Data negara berhasil dihapus');
    }
}
