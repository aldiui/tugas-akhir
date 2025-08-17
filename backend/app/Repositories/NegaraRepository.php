<?php
namespace App\Repositories;

use App\Models\Negara;
use Illuminate\Support\Facades\DB;

class NegaraRepository
{
    protected $model;

    public function __construct(Negara $model)
    {
        $this->model = $model;
    }

    public function getAll($perPage = 10, $search = null, $orderBy = 'created_at', $sortBy = 'asc')
    {
        $query = $this->model->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('mata_uang', 'REGEXP', $search)
                    ->orWhere('kode_mata_uang', 'REGEXP', $search)
                    ->orWhere('simbol_mata_uang', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'mata_uang', 'kode_mata_uang', 'simbol_mata_uang', 'created_at', 'updated_at'])) {
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
            $negara = $this->model->create($data);
            DB::commit();
            return $negara;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $negara = $this->findById($id);
            $negara->update($data);
            DB::commit();
            return $negara;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $negara = $this->findById($id);
            $negara->delete();
            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
