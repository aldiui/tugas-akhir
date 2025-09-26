<?php

use App\Http\Controllers\Admin\AdminKelasController;
use App\Http\Controllers\Admin\AdminLokasiController;
use App\Http\Controllers\Admin\AdminMataPelajaranController;
use App\Http\Controllers\Admin\AdminNegaraController;
use App\Http\Controllers\Admin\AdminNotifikasiController;
use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Cpmi\CpmiAbsensiController;
use App\Http\Controllers\Cpmi\CpmiJadwalPelajaranController;
use App\Http\Controllers\Cpmi\CpmiPengalamanKerjaController;
use App\Http\Controllers\Cpmi\CpmiPiketController;
use App\Http\Controllers\MeController;
use App\Http\Controllers\Pengajar\PengajarJadwalPelajaranController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/change-password', [MeController::class, 'changePassword']);
    Route::get('/profile', [MeController::class, 'profile']);
    Route::put('/update-profile', [MeController::class, 'updateProfile']);

    Route::prefix('admin')->group(function () {
        Route::get('/permission', [AdminPermissionController::class, 'index'])->middleware('permission:PERM_READ');

        Route::get('/role', [AdminRoleController::class, 'index'])->middleware('permission:ROL_READ');
        Route::get('/role/{id}', [AdminRoleController::class, 'show'])->middleware('permission:ROL_READ');
        Route::post('/role', [AdminRoleController::class, 'store'])->middleware('permission:ROL_CREATE');
        Route::put('/role/{id}', [AdminRoleController::class, 'update'])->middleware('permission:ROL_UPDATE');
        Route::delete('/role/{id}', [AdminRoleController::class, 'destroy'])->middleware('permission:ROL_DELETE');

        Route::get('/user', [AdminUserController::class, 'index'])->middleware('permission:USR_READ');
        Route::get('/user/{id}', [AdminUserController::class, 'show'])->middleware('permission:USR_READ');
        Route::post('/user', [AdminUserController::class, 'store'])->middleware('permission:USR_CREATE');
        Route::put('/user/{id}', [AdminUserController::class, 'update'])->middleware('permission:USR_UPDATE');
        Route::delete('/user/{id}', [AdminUserController::class, 'destroy'])->middleware('permission:USR_DELETE');

        Route::get('/negara', [AdminNegaraController::class, 'index'])->middleware('permission:NGR_READ');
        Route::get('/negara/{id}', [AdminNegaraController::class, 'show'])->middleware('permission:NGR_READ');
        Route::post('/negara', [AdminNegaraController::class, 'store'])->middleware('permission:NGR_CREATE');
        Route::put('/negara/{id}', [AdminNegaraController::class, 'update'])->middleware('permission:NGR_UPDATE');
        Route::delete('/negara/{id}', [AdminNegaraController::class, 'destroy'])->middleware('permission:NGR_DELETE');

        Route::get('/lokasi', [AdminLokasiController::class, 'index'])->middleware('permission:LKS_READ');
        Route::get('/lokasi/{id}', [AdminLokasiController::class, 'show'])->middleware('permission:LKS_READ');
        Route::post('/lokasi', [AdminLokasiController::class, 'store'])->middleware('permission:LKS_CREATE');
        Route::put('/lokasi/{id}', [AdminLokasiController::class, 'update'])->middleware('permission:LKS_UPDATE');
        Route::delete('/lokasi/{id}', [AdminLokasiController::class, 'destroy'])->middleware('permission:LKS_DELETE');

        Route::get('/mata-pelajaran', [AdminMataPelajaranController::class, 'index'])->middleware('permission:MPL_READ');
        Route::get('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'show'])->middleware('permission:MPL_READ');
        Route::post('/mata-pelajaran', [AdminMataPelajaranController::class, 'store'])->middleware('permission:MPL_CREATE');
        Route::put('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'update'])->middleware('permission:MPL_UPDATE');
        Route::delete('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'destroy'])->middleware('permission:MPL_DELETE');

        Route::get('/kelas', [AdminKelasController::class, 'index'])->middleware('permission:KLS_READ');
        Route::get('/kelas/{id}', [AdminKelasController::class, 'show'])->middleware('permission:KLS_READ');
        Route::post('/kelas', [AdminKelasController::class, 'store'])->middleware('permission:KLS_CREATE');
        Route::put('/kelas/{id}', [AdminKelasController::class, 'update'])->middleware('permission:KLS_UPDATE');
        Route::delete('/kelas/{id}', [AdminKelasController::class, 'destroy'])->middleware('permission:KLS_DELETE');

        Route::get('/notifikasi', [AdminNotifikasiController::class, 'index'])->middleware('permission:NOT_READ');
        Route::get('/notifikasi/{id}', [AdminNotifikasiController::class, 'show'])->middleware('permission:NOT_READ');
        Route::post('/notifikasi', [AdminNotifikasiController::class, 'store'])->middleware('permission:NOT_CREATE');
        Route::put('/notifikasi/{id}', [AdminNotifikasiController::class, 'update'])->middleware('permission:NOT_UPDATE');
        Route::delete('/notifikasi/{id}', [AdminNotifikasiController::class, 'destroy'])->middleware('permission:NOT_DELETE');
    });

    Route::prefix('cpmi')->group(function () {
        Route::get('/absensi', [CpmiAbsensiController::class, 'index']);
        Route::post('/absensi', [CpmiAbsensiController::class, 'store']);

        Route::get('/piket', [CpmiPiketController::class, 'index']);
        Route::post('/piket', [CpmiPiketController::class, 'store']);

        Route::get('/jadwal-pelajaran', [CpmiJadwalPelajaranController::class, 'index']);

        Route::get('/pengalaman-kerja', [CpmiPengalamanKerjaController::class, 'index']);
        Route::get('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'show']);
        Route::post('/pengalaman-kerja', [CpmiPengalamanKerjaController::class, 'store']);
        Route::put('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'update']);
        Route::delete('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'destroy']);
    });

    Route::prefix('pengajar')->group(function () {
        Route::get('/jadwal-pelajaran', [PengajarJadwalPelajaranController::class, 'index']);
        Route::get('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'show']);
        Route::post('/jadwal-pelajaran', [PengajarJadwalPelajaranController::class, 'store']);
        Route::put('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'update']);
        Route::delete('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'destroy']);
    });
});
