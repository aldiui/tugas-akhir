<?php
namespace App\Services;

use App\Repositories\KelasRepository;

class KelasService
{
    protected $kelasRepository;

    public function __construct(KelasRepository $kelasRepository)
    {
        $this->kelasRepository = $kelasRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->kelasRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->kelasRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->kelasRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->kelasRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->kelasRepository->delete($id);
    }
}
