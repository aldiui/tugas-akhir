<?php
namespace App\Repositories;

use App\Models\Lokasi;
use Illuminate\Support\Facades\DB;

class LokasiRepository
{
    protected $model;

    public function __construct(Lokasi $model)
    {
        $this->model = $model;
    }

    public function getAll(int $perPage = 10, string $search = null, string $orderBy = 'created_at', string $sortBy = 'asc')
    {
        $query = $this->model->query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'REGEXP', $search)
                    ->orWhere('kode', 'REGEXP', $search)
                    ->orWhere('latitude', 'REGEXP', $search)
                    ->orWhere('longitude', 'REGEXP', $search)
                    ->orWhere('radius', 'REGEXP', $search)
                    ->orWhere('alamat', 'REGEXP', $search)
                    ->orWhere('telepon', 'REGEXP', $search);
            });
        }

        if (in_array($orderBy, ['id', 'kode', 'nama', 'latitude', 'longitude', 'radius', 'alamat', 'telepon', 'created_at', 'updated_at'])) {
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
            $lokasi = $this->model->create($data);
            DB::commit();
            return $lokasi;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $lokasi = $this->findById($id);
            $lokasi->update($data);
            DB::commit();
            return $lokasi;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete(string $id)
    {
        DB::beginTransaction();
        try {
            $lokasi = $this->findById($id);
            $lokasi->delete();
            DB::commit();
            return true;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
