<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\NegaraController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\MataPelajaranController;

Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/permission', [PermissionController::class, 'index'])->middleware('permission:PERM_READ');

    Route::get('/role', [RoleController::class, 'index'])->middleware('permission:ROL_READ');
    Route::get('/role/{id}', [RoleController::class, 'show'])->middleware('permission:ROL_READ');
    Route::post('/role', [RoleController::class, 'store'])->middleware('permission:ROL_CREATE');
    Route::put('/role/{id}', [RoleController::class, 'update'])->middleware('permission:ROL_UPDATE');
    Route::delete('/role/{id}', [RoleController::class, 'destroy'])->middleware('permission:ROL_DELETE');

    Route::get('/user', [UserController::class, 'index'])->middleware('permission:USR_READ');
    Route::get('/user/{id}', [UserController::class, 'show'])->middleware('permission:USR_READ');
    Route::post('/user', [UserController::class, 'store'])->middleware('permission:USR_CREATE');
    Route::put('/user/{id}', [UserController::class, 'update'])->middleware('permission:USR_UPDATE');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->middleware('permission:USR_DELETE');

    Route::get('/negara', [NegaraController::class, 'index'])->middleware('permission:NGR_READ');
    Route::get('/negara/{id}', [NegaraController::class, 'show'])->middleware('permission:NGR_READ');
    Route::post('/negara', [NegaraController::class, 'store'])->middleware('permission:NGR_CREATE');
    Route::put('/negara/{id}', [NegaraController::class, 'update'])->middleware('permission:NGR_UPDATE');
    Route::delete('/negara/{id}', [NegaraController::class, 'destroy'])->middleware('permission:NGR_DELETE');

    Route::get('/lokasi', [LokasiController::class, 'index'])->middleware('permission:LKS_READ');
    Route::get('/lokasi/{id}', [LokasiController::class, 'show'])->middleware('permission:LKS_READ');
    Route::post('/lokasi', [LokasiController::class, 'store'])->middleware('permission:LKS_CREATE');
    Route::put('/lokasi/{id}', [LokasiController::class, 'update'])->middleware('permission:LKS_UPDATE');
    Route::delete('/lokasi/{id}', [LokasiController::class, 'destroy'])->middleware('permission:LKS_DELETE');

    Route::get('/mata-pelajaran', [MataPelajaranController::class, 'index'])->middleware('permission:MPL_READ');
    Route::get('/mata-pelajaran/{id}', [MataPelajaranController::class, 'show'])->middleware('permission:MPL_READ');
    Route::post('/mata-pelajaran', [MataPelajaranController::class, 'store'])->middleware('permission:MPL_CREATE');
    Route::put('/mata-pelajaran/{id}', [MataPelajaranController::class, 'update'])->middleware('permission:MPL_UPDATE');
    Route::delete('/mata-pelajaran/{id}', [MataPelajaranController::class, 'destroy'])->middleware('permission:MPL_DELETE');

    Route::get('/kelas', [KelasController::class, 'index'])->middleware('permission:KLS_READ');
    Route::get('/kelas/{id}', [KelasController::class, 'show'])->middleware('permission:KLS_READ');
    Route::post('/kelas', [KelasController::class, 'store'])->middleware('permission:KLS_CREATE');
    Route::put('/kelas/{id}', [KelasController::class, 'update'])->middleware('permission:KLS_UPDATE');
    Route::delete('/kelas/{id}', [KelasController::class, 'destroy'])->middleware('permission:KLS_DELETE');
});
