<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register user
     */
    public function registrasi(Request $request): JsonResponse
    {
        $request->validate([
            'nama'                => 'required|string|min:3',
            'email'               => 'required|string|email|max:255|unique:cpmi',
            'telepon'             => 'required|string|min:10',
            'jenis_kelamin'       => 'required|in:Laki-laki,Perempuan',
            'alamat'              => 'required|string|min:3',
            'nik'                 => 'required|string|size:16|unique:users',
            'lokasi_id'           => 'required|exists:lokasi,id',
            'negara_id'           => 'required|uuid|exists:negara,id',
            'password'            => 'required|string|min:8',
            'konfirmasi_password' => 'required|string|min:8|same:password',
        ]);

        $roleCpmi = Role::where('nama', 'CPMI')->first();

        DB::beginTransaction();
        try {
            User::create([
                'nama'          => $request->input('nama'),
                'email'         => $request->input('email'),
                'nomor_telepon' => $request->input('telepon'),
                'jenis_kelamin' => $request->input('jenis_kelamin'),
                'alamat'        => $request->input('alamat'),
                'nik'           => $request->input('nik'),
                'lokasi_id'     => $request->input('lokasi_id'),
                'negara_id'     => $request->input('negara_id'),
                'password'      => Hash::make($request->input('password')),
                'role_id'       => $roleCpmi->id,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return $this->successResponse(null, 'Registrasi berhasil');
    }

    /**
     * Login user
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

        $token = $user->createToken('auth_token')->plainTextToken;
        $token = explode('|', $token)[1];

        return $this->successResponse(compact('token'), 'Login berhasil');
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return $this->successResponse(null, 'Logout berhasil');
    }
}
