<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\PermissionService;

class PermissionController extends Controller
{
    protected $service;

    public function __construct(PermissionService $service)
    {
        $this->service = $service;
    }

    /**
     * Ambil semua data permission
     */
    public function index()
    {
        $permission = $this->service->list();

        return $this->successResponse($permission, 'Data permission berhasil diambil');
    }
}
