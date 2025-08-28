<?php

namespace App\Services;

use App\Repositories\LokasiRepository;

class LokasiService
{
    protected $lokasiRepository;

    public function __construct(LokasiRepository $lokasiRepository)
    {
        $this->lokasiRepository = $lokasiRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->lokasiRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->lokasiRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->lokasiRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->lokasiRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->lokasiRepository->delete($id);
    }
}
