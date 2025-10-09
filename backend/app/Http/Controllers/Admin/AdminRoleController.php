<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminRoleController extends Controller
{
    /**
     * Ambil semua data role
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
                    ->orWhere('tipe', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'tipe', 'created_at', 'updated_at'])) {
            $sortBy = strtolower($sortBy) === 'desc' ? 'desc' : 'asc';
            $query->orderBy($orderBy, $sortBy);
        } else {
            $query->orderBy('created_at', 'asc');
        }

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $role = $query->paginate($perPage)->withPath('');

        return $this->successResponse($role, 'Data role berhasil diambil');
    }

    /**
     * Tambah data role baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'          => 'required|string|max:255|unique:role,nama',
            'tipe'          => 'required|string|in:CPMI,Admin,Pengajar',
            'permissions'   => 'required|array|min:1',
            'permissions.*' => 'required|string|exists:permission,id',
        ]);

        DB::beginTransaction();
        try {
            $role = Role::create([
                'nama' => $request->input('nama'),
                'tipe' => $request->input('tipe'),
            ]);
            $role->permissions()->sync($request->input('permissions'));
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($role, 'Data role berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail role berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        $role->permissions = $role->permissions()->pluck('permission.id')->toArray();
        return $this->successResponse($role, 'Detail role berhasil diambil');
    }

    /**
     * Perbarui data role berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'nama'          => 'required|string|max:255|unique:role,nama,' . $id,
            'tipe'          => 'required|string|in:CPMI,Admin,Pengajar',
            'permissions'   => 'required|array|min:1',
            'permissions.*' => 'required|string|exists:permission,id',
        ]);

        $role = Role::findOrFail($id);

        DB::beginTransaction();
        try {
            $role->update([
                'nama' => $request->input('nama'),
                'tipe' => $request->input('tipe'),
            ]);
            $role->permissions()->sync($request->input('permissions'));
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($role, 'Data role berhasil diperbarui');
    }

    /**
     * Hapus data role berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $role = Role::findOrFail($id);

        if ($role->users()->count() > 0) {
            return $this->errorResponse('Role tidak dapat dihapus karena sedang digunakan', 400);
        }

        DB::beginTransaction();
        try {
            $role->permissions()->detach();
            $role->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data role berhasil dihapus');
    }
}
