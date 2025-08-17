<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
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

        $user = $this->service->list($perPage, $search, $orderBy, $sortBy);

        return $this->successResponse($user, 'Data user berhasil diambil');
    }

    /**
     * Tambah data user baru
     */
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->service->create($request->validated());

        return $this->successResponse($user, 'Data user berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail user berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $user = $this->service->find($id);

        return $this->successResponse($user, 'Detail user berhasil diambil');
    }

    /**
     * Perbarui data user berdasarkan ID
     */
    public function update(UserRequest $request, string $id): JsonResponse
    {
        $user = $this->service->update($id, $request->validated());

        return $this->successResponse($user, 'Data user berhasil diperbarui');
    }

    /**
     * Hapus data user berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return $this->successResponse(null, 'Data user berhasil dihapus');
    }

    /**
     * Login user
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->service->login($request->validated());

        return $this->successResponse($user, 'Login berhasil');
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        $this->service->logout($request);

        return $this->successResponse(null, 'Logout berhasil');
    }
}
