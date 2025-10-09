<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;

class AdminPermissionController extends Controller
{
    /**
     * Ambil semua data permission
     */
    public function index()
    {
        $permission = Permission::select('id', 'kode', 'nama')->get();
        return $this->successResponse($permission, 'Data permission berhasil diambil');
    }
}
