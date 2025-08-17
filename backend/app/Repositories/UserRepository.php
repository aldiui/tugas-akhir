<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function getAll($perPage = 10, $search = null, $orderBy = 'created_at', $sortBy = 'asc')
    {
        $query = $this->model->query();

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

        return $query->paginate($perPage)->withPath('');
    }

    public function findById(string $id)
    {
        return $this->model->findOrFail($id);
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->firstOrFail();
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $user = $this->model->create($data);
            return $user;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $user = $this->findById($id);
            $user->update([
                'nama'     => $data['nama'],
                'email'    => $data['email'],
                'role_id'  => $data['role_id'],
                'password' => isset($data['password']) ? bcrypt($data['password']) : $user->password,
            ]);
            DB::commit();
            return $user;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $user = $this->findById($id);
            $user->delete();
            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
