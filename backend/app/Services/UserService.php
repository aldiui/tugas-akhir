<?php
namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->repository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function find(string $id)
    {
        return $this->repository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->repository->delete($id);
    }

    public function login(array $data)
    {
        $user = $this->repository->findByEmail($data['email']);

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
}
