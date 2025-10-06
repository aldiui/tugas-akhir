<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminCpmiController extends Controller
{
    /**
     * Ambil semua data cpmi
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $search  = $request->input('search');
        $orderBy = $request->input('order_by', 'created_at');
        $sortBy  = $request->input('sort_by', 'asc');

        $query = User::query();
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

        $cpmi = $query->paginate($perPage)->withPath('');

        return $this->successResponse($cpmi, 'Data cpmi berhasil diambil');
    }

    /**
     * Tambah data cpmi baru
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nama'                => 'required|string|max:255',
            'role_id'             => 'required|uuid|exists:role,id',
            'lokasi_id'           => 'nullable|exists:lokasi,id',
            'email'               => 'required|string|email|max:255|unique:users,email',
            'password'            => 'required|string|min:8|max:255',
            'konfirmasi_password' => 'required|string|min:8|max:255|same:password',
        ]);

        DB::beginTransaction();
        try {
            $cpmi = User::create([
                'nama'      => $request->input('nama'),
                'role_id'   => $request->input('role_id'),
                'lokasi_id' => $request->input('lokasi_id'),
                'email'     => $request->input('email'),
                'password'  => $request->input('password'),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($cpmi, 'Data cpmi berhasil ditambahkan', 201);
    }

    /**
     * Ambil detail cpmi berdasarkan ID
     */
    public function show(string $id): JsonResponse
    {
        $cpmi = User::findOrFail($id);
        return $this->successResponse($cpmi, 'Detail cpmi berhasil diambil');
    }

    /**
     * Perbarui data cpmi berdasarkan ID
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'nama'                => 'required|string|max:255',
            'role_id'             => 'required|uuid|exists:role,id',
            'lokasi_id'           => 'nullable|exists:lokasi,id',
            'email'               => 'required|string|email|max:255|unique:users,email,' . $id,
            'password'            => 'nullable|string|min:8|max:255',
            'konfirmasi_password' => 'nullable|string|min:8|max:255|same:password',
        ]);

        $cpmi = User::findOrFail($id);

        DB::beginTransaction();
        try {
            $cpmi->update([
                'nama'      => $request->input('nama'),
                'role_id'   => $request->input('role_id'),
                'lokasi_id' => $request->input('lokasi_id'),
                'email'     => $request->input('email'),
                'password'  => $request->input('password') ? bcrypt($request->input('password')) : $user->password,
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse($cpmi, 'Data cpmi berhasil diperbarui');
    }

    /**
     * Hapus data cpmi berdasarkan ID
     */
    public function destroy(string $id): JsonResponse
    {
        $cpmi = User::findOrFail($id);

        DB::beginTransaction();
        try {
            $cpmi->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
        }

        return $this->successResponse(null, 'Data cpmi berhasil dihapus');
    }
}
