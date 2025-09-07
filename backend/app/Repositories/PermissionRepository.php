<?php
namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository
{
    protected $permissionModel;

    public function __construct(Permission $permissionModel)
    {
        $this->permissionModel = $permissionModel;
    }

    public function getAll()
    {
        return $this->permissionModel->all();
    }
}
