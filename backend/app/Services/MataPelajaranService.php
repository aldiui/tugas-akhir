<?php
namespace App\Services;

use App\Repositories\MataPelajaranRepository;

class MataPelajaranService
{
    protected $repository;

    public function __construct(MataPelajaranRepository $repository)
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
}
