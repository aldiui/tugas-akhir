<?php
namespace App\Http\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AdminUserController extends Controller
{
    /**
     * Ambil semua data user
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = Role::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('email', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'email', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $user = $query->paginate($perPage)->withPath('');

        return $this->successResponse($user, 'Data user berhasil diambil');
    }

    /**
     * Tambah data user baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'                => 'required|string|max:255',
            'role_id'             => 'required|uuid|exists:role,id',
            'email'               => 'required|string|email|max:255|unique:users,email',
            'password'            => 'required|string|min:8|max:255',
            'konfirmasi_password' => 'required|string|min:8|max:255|same:password',
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'nama'     => $request->input('nama'),
                'role_id'  => $request->input('role_id'),
                'email'    => $request->input('email'),
                'password' => $request->input('password'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($user, 'Data user berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail user berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        return $this->successResponse($user, 'Detail user berhasil diambil');
    }

    /**
     * Perbarui data user berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'nama'                => 'required|string|max:255',
            'role_id'             => 'required|uuid|exists:role,id',
            'email'               => 'required|string|email|max:255|unique:users,email,' . $id,
            'password'            => 'nullable|string|min:8|max:255',
            'konfirmasi_password' => 'nullable|string|min:8|max:255|same:password',
        ]);

        $user = User::findOrFail($id);

        DB::beginTransaction();
        try {
            $user->update([
                'nama'     => $request->input('nama'),
                'role_id'  => $request->input('role_id'),
                'email'    => $request->input('email'),
                'password' => $request->input('password') ? bcrypt($request->input('password')) : $user->password,
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data user berhasil dihapus');
    }


    /**
     * Hapus data user berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        DB::beginTransaction();
        try {
            $user->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data user berhasil dihapus');
    }
}
