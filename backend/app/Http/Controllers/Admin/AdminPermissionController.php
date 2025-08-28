<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PermissionService;

class AdminPermissionController extends Controller
{
    protected $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    /**
     * Ambil semua data permission
     */
    public function index()
    {
        $permission = $this->permissionService->list();

        return $this->successResponse($permission, 'Data permission berhasil diambil');
    }
}
