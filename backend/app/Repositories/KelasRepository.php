<?php
namespace App\Repositories;

use App\Models\Kelas;
use Illuminate\Support\Facades\DB;

class KelasRepository
{
    protected $kelasModel;

    public function __construct(Kelas $kelasModel)
    {
        $this->kelasModel = $kelasModel;
    }

    public function getAll(int $perPage = 10, string $search = null, string $orderBy = 'created_at', string $sortBy = 'asc')
    {
        $query = $this->kelasModel->query();

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
        return $this->kelasModel->findOrFail($id);
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $kelas = $this->kelasModel->create([
                'nama'        => $data['nama'],
                'pengajar_id' => $data['pengajar_id'],
                'lokasi_id'   => $data['lokasi_id'],
            ]);

            if (isset($data['mata_pelajaran'])) {
                $kelas->jadwalPelajaran()->createMany($data['mata_pelajaran']);
            }

            DB::commit();
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
            $kelas->update([
                'nama'        => $data['nama'],
                'pengajar_id' => $data['pengajar_id'],
                'lokasi_id'   => $data['lokasi_id'],
            ]);

            if (isset($data['mata_pelajaran'])) {
                foreach ($data['mata_pelajaran'] as $mp) {
                    if (isset($mp['id'])) {
                        $jadwal = $kelas->jadwalPelajaran()->find($mp['id']);
                        if ($jadwal) {
                            $jadwal->update($mp);
                        }
                    } else {
                        $kelas->jadwalPelajaran()->create($mp);
                    }
                }
            }

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
