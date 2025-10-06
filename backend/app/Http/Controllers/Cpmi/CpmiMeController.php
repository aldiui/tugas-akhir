<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CpmiMeController extends Controller
{
    /**
     * Ubah password user
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'password_lama'       => 'required|string|min:8|max:255',
            'password'            => 'required|string|min:8|max:255',
            'konfirmasi_password' => 'required|string|min:8|max:255|same:password',
        ]);

        $user = auth()->user();

        if (! Hash::check($request->input('password_lama'), $user->password)) {
            throw new AuthenticationException('Kredensial tidak valid');
        }

        DB::beginTransaction();
        try {
            $user->update([
                'password' => Hash::make($request->input('password')),
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $this->successResponse(null, 'Password berhasil diubah');
    }

    /**
     * Get user profile
     */
    public function profile(): JsonResponse
    {
        $user = auth()->user();

        $data = [
            'user'       => $user,
            'cpmiData'   => $user->cpmiData,
            'role'       => $user->role ? $user->role->only('nama', 'tipe') : null,
            'permission' => $user->role
                ? $user->role->permissions->map(function ($permission) {
                return $permission->only(['kode', 'nama']);
            })
                : [],
        ];

        return $this->successResponse($data, 'Profile berhasil diambil');
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $request->validate([
            'nama'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255',
            'nomor_telepon' => 'nullable|string|max:20',
        ]);

        $user = $request->user();

        DB::beginTransaction();
        try {
            $user->update([
                'nama'          => $request->input('nama'),
                'email'         => $request->input('email'),
                'nomor_telepon' => $request->input('nomor_telepon'),
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $this->successResponse($user, 'Profile berhasil diupdate');
    }
}
