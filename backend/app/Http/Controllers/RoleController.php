<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected $service;

    public function __construct(RoleService $service)
    {
        $this->service = $service;
    }

    /**
     * Ambil semua data role
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $role = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($role, 'Data role berhasil diambil');
    }

    /**
     * Tambah data role baru
     */
    public function store(RoleRequest $request): JsonResponse
    {
        $role = $this->service->create($request->validated());

        return $this->successResponse($role, 'Data role berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail role berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $role = $this->service->find($id);

        return $this->successResponse($role, 'Detail role berhasil diambil');
    }

    /**
     * Perbarui data role berdasarkan ID
     */
    public function update(RoleRequest $request, string $id): JsonResponse
    {
        $role = $this->service->update($id, $request->validated());

        return $this->successResponse($role, 'Data role berhasil diperbarui');
    }

    /**
     * Hapus data role berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data role berhasil dihapus');
    }
}
