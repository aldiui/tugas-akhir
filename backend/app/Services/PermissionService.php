<?php
namespace App\Services;

use App\Repositories\PermissionRepository;

class PermissionService
{
    protected $repository;

    public function __construct(PermissionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list()
    {
        return $this->repository->getAll();
    }
}
