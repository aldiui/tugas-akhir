<?php
namespace App\Services;

use App\Repositories\NegaraRepository;

class NegaraService
{
    protected $negaraRepository;

    public function __construct(NegaraRepository $negaraRepository)
    {
        $this->negaraRepository = $negaraRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->negaraRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->negaraRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->negaraRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->negaraRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->negaraRepository->delete($id);
    }
}
