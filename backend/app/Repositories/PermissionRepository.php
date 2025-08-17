<?php
namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository
{
    protected $model;

    public function __construct(Permission $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->all();
    }
}
