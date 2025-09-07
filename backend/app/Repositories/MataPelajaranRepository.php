<?php
namespace App\Repositories;

use App\Models\MataPelajaran;
use Illuminate\Support\Facades\DB;

class MataPelajaranRepository
{
    protected $mataPelajaranModel;

    public function __construct(MataPelajaran $mataPelajaranModel)
    {
        $this->mataPelajaranModel = $mataPelajaranModel;
    }

    public function getAll(int $perPage = 10, string $search = null, string $orderBy = 'created_at', string $sortBy = 'asc')
    {
        $query = $this->mataPelajaranModel->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('deskripsi', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'deskripsi', 'created_at', 'updated_at'])) {
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
        return $this->mataPelajaranModel->findOrFail($id);
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $mataPelajaran = $this->model->create($data);
            DB::commit();
            return $mataPelajaran;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $mataPelajaran = $this->findById($id);
            $mataPelajaran->update($data);
            DB::commit();
            return $mataPelajaran;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $mataPelajaran = $this->findById($id);
            $mataPelajaran->delete();
            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
