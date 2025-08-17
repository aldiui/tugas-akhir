<?php
namespace App\Repositories;

use App\Models\Kelas;
use Illuminate\Support\Facades\DB;

class KelasRepository
{
    protected $model;

    public function __construct(Kelas $model)
    {
        $this->model = $model;
    }

    public function getAll($perPage = 10, $search = null, $orderBy = 'created_at', $sortBy = 'asc')
    {
        $query = $this->model->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'nama', 'created_at', 'updated_at'])) {
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

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $kelas = $this->model->create($data);
            return $kelas;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $kelas = $this->findById($id);
            $kelas->update($data);
            DB::commit();
            return $kelas;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $kelas = $this->findById($id);
            $kelas->delete();
            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
