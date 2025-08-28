<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Ambil semua data user
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $user = $this->userService->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($user, 'Data user berhasil diambil');
    }

    /**
     * Tambah data user baru
     */
    public function store(AdminUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());

        return $this->successResponse($user, 'Data user berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail user berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $user = $this->userService->find($id);

        return $this->successResponse($user, 'Detail user berhasil diambil');
    }

    /**
     * Perbarui data user berdasarkan ID
     */
    public function update(AdminUserRequest $request, string $id): JsonResponse
    {
        $user = $this->userService->update($id, $request->validated());

        return $this->successResponse($user, 'Data user berhasil diperbarui');
    }

    /**
     * Hapus data user berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->userService->delete($id);

        return $this->successResponse(null, 'Data user berhasil dihapus');
    }
}
