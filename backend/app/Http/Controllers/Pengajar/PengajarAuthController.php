<?php

namespace App\Http\Controllers\Pengajar;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class PengajarAuthController extends Controller
{
    /**
     * Login user pengajar
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (! $user || ! Hash::check($request->input('password'), $user->password)) {
            throw new AuthenticationException('Kredensial tidak valid');
        }

        $role = $user->role()->first();
        if ($role->type !== 'Pengajar') {
            throw new AuthenticationException('Akses ditolak');
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $token = explode('|', $token)[1];

        return $this->successResponse(compact('token'), 'Login berhasil');
    }

    /**
     * Logout user pengajar
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            throw new AuthenticationException('User tidak ditemukan');
        }

        $role = $user->role()->first();
        if ($role->type !== 'Pengajar') {
            throw new AuthenticationException('Akses ditolak');
        }

        $user->currentAccessToken()->delete();
        return $this->successResponse(null, 'Logout berhasil');
    }
}
