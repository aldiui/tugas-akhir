<?php
namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->userRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->userRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->userRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->userRepository->delete($id);
    }

    public function login(array $data)
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw new AuthenticationException('Kredensial tidak valid');
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $token = explode('|', $token)[1];

        return [
            'token' => $token,
        ];
    }

    public function logout($request)
    {
        $request->user()->tokens()->delete();
    }

    public function changePassword($request)
    {
        $user = auth()->user();

        if (! Hash::check($request->password_lama, $user->password)) {
            throw new AuthenticationException('Kredensial tidak valid');
        }

        return $this->userRepository->changePassword($user->id, $request->validated());
    }

    public function profile()
    {
        $user = auth()->user();

        return [
            'user'       => $user->only('nama', 'email', 'nomor_telepon'),
            'role'       => $user->role ? $user->role->only('nama', 'tipe') : null,
            'permission' => $user->role
            ? $user->role->permissions->map(function ($permission) {
                return $permission->only(['kode', 'nama']);
            })
            : [],
        ];
    }

    public function updateProfile($request)
    {
        $user = auth()->user();

        $checkEmail = $this->userRepository->findByEmail($request->email);
        if ($checkEmail && $checkEmail->id !== $user->id) {
            throw new \Exception('Email sudah digunakan');
        }

        if ($request->nomor_telepon) {
            $checkNomorTelepon = $this->userRepository->findByNomorTelepon($request->nomor_telepon);
            if ($checkNomorTelepon && $checkNomorTelepon->id !== $user->id) {
                throw new \Exception('Nomor telepon sudah digunakan');
            }
        }

        return $this->userRepository->updateProfile($user->id, $request->validated());
    }
}
