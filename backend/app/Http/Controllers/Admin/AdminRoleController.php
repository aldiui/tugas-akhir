<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminRoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
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

        $role = $this->roleService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($role, 'Data role berhasil diambil');
    }

    /**
     * Tambah data role baru
     */
    public function store(AdminRoleRequest $request): JsonResponse
    {
        $role = $this->roleService->create($request->validated());

        return $this->successResponse($role, 'Data role berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail role berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $role = $this->roleService->find($id);

        return $this->successResponse($role, 'Detail role berhasil diambil');
    }

    /**
     * Perbarui data role berdasarkan ID
     */
    public function update(AdminRoleRequest $request, string $id): JsonResponse
    {
        $role = $this->roleService->update($id, $request->validated());

        return $this->successResponse($role, 'Data role berhasil diperbarui');
    }

    /**
     * Hapus data role berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->roleService->delete($id);

        return $this->successResponse(null, 'Data role berhasil dihapus');
    }
}
