<?php
namespace App\Services;

use App\Repositories\MataPelajaranRepository;

class MataPelajaranService
{
    protected $mataPelajaranRepository;

    public function __construct(MataPelajaranRepository $mataPelajaranRepository)
    {
        $this->mataPelajaranRepository = $mataPelajaranRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->mataPelajaranRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->mataPelajaranRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->mataPelajaranRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->mataPelajaranRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->mataPelajaranRepository->delete($id);
    }
}
