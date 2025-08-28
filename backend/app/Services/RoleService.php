<?php

namespace App\Services;

use App\Repositories\RoleRepository;

class RoleService
{
    protected $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function list($perPage, $search, $orderBy, $sortBy)
    {
        return $this->roleRepository->getAll($perPage, $search, $orderBy, $sortBy);
    }

    public function create(array $data)
    {
        return $this->roleRepository->create($data);
    }

    public function find(string $id)
    {
        return $this->roleRepository->findById($id);
    }

    public function update(string $id, array $data)
    {
        return $this->roleRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->roleRepository->delete($id);
    }
}
