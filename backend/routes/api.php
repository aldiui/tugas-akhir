<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminCpmiController;
use App\Http\Controllers\Admin\AdminIzinController;
use App\Http\Controllers\Admin\AdminJenisPekerjaanController;
use App\Http\Controllers\Admin\AdminKelasController;
use App\Http\Controllers\Admin\AdminLokasiController;
use App\Http\Controllers\Admin\AdminMataPelajaranController;
use App\Http\Controllers\Admin\AdminMeController;
use App\Http\Controllers\Admin\AdminNegaraController;
use App\Http\Controllers\Admin\AdminNotifikasiController;
use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\Admin\AdminSektorController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Cpmi\CpmiAbsensiController;
use App\Http\Controllers\Cpmi\CpmiAuthController;
use App\Http\Controllers\Cpmi\CpmiIzinController;
use App\Http\Controllers\Cpmi\CpmiJadwalPelajaranController;
use App\Http\Controllers\Cpmi\CpmiMeController;
use App\Http\Controllers\Cpmi\CpmiOtherController;
use App\Http\Controllers\Cpmi\CpmiPengalamanKerjaController;
use App\Http\Controllers\Cpmi\CpmiPiketController;
use App\Http\Controllers\Pengajar\PengajarAuthController;
use App\Http\Controllers\Pengajar\PengajarJadwalPelajaranController;
use App\Http\Controllers\Pengajar\PengajarMeController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::get('/negara', [AdminNegaraController::class, 'index']);
    Route::get('/negara/{id}', [AdminNegaraController::class, 'show']);
    Route::post('/negara', [AdminNegaraController::class, 'store']);
    Route::put('/negara/{id}', [AdminNegaraController::class, 'update']);
    Route::delete('/negara/{id}', [AdminNegaraController::class, 'destroy']);

    Route::get('/lokasi', [AdminLokasiController::class, 'index']);
    Route::get('/lokasi/{id}', [AdminLokasiController::class, 'show']);
    Route::post('/lokasi', [AdminLokasiController::class, 'store']);
    Route::put('/lokasi/{id}', [AdminLokasiController::class, 'update']);
    Route::delete('/lokasi/{id}', [AdminLokasiController::class, 'destroy']);

    Route::get('/mata-pelajaran', [AdminMataPelajaranController::class, 'index']);
    Route::get('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'show']);
    Route::post('/mata-pelajaran', [AdminMataPelajaranController::class, 'store']);
    Route::put('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'update']);
    Route::delete('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'destroy']);

    Route::get('/sektor', [AdminSektorController::class, 'index']);
    Route::get('/sektor/{id}', [AdminSektorController::class, 'show']);
    Route::post('/sektor', [AdminSektorController::class, 'store']);
    Route::put('/sektor/{id}', [AdminSektorController::class, 'update']);
    Route::delete('/sektor/{id}', [AdminSektorController::class, 'destroy']);

    Route::get('/jenis-pekerjaan', [AdminJenisPekerjaanController::class, 'index']);
    Route::get('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'show']);
    Route::post('/jenis-pekerjaan', [AdminJenisPekerjaanController::class, 'store']);
    Route::put('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'update']);
    Route::delete('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'destroy']);

    Route::get('/role', [AdminRoleController::class, 'index']);
    Route::get('/role/{id}', [AdminRoleController::class, 'show']);
    Route::post('/role', [AdminRoleController::class, 'store']);
    Route::put('/role/{id}', [AdminRoleController::class, 'update']);
    Route::delete('/role/{id}', [AdminRoleController::class, 'destroy']);

    Route::get('/user', [AdminUserController::class, 'index']);
    Route::get('/user/{id}', [AdminUserController::class, 'show']);
    Route::post('/user', [AdminUserController::class, 'store']);
    Route::put('/user/{id}', [AdminUserController::class, 'update']);
    Route::delete('/user/{id}', [AdminUserController::class, 'destroy']);

    Route::get('/kelas', [AdminKelasController::class, 'index']);
    Route::get('/kelas/{id}', [AdminKelasController::class, 'show']);
    Route::post('/kelas', [AdminKelasController::class, 'store']);
    Route::put('/kelas/{id}', [AdminKelasController::class, 'update']);
    Route::delete('/kelas/{id}', [AdminKelasController::class, 'destroy']);

    Route::get('/notifikasi', [AdminNotifikasiController::class, 'index']);
    Route::get('/notifikasi/{id}', [AdminNotifikasiController::class, 'show']);
    Route::post('/notifikasi', [AdminNotifikasiController::class, 'store']);
    Route::put('/notifikasi/{id}', [AdminNotifikasiController::class, 'update']);
    Route::delete('/notifikasi/{id}', [AdminNotifikasiController::class, 'destroy']);

    Route::middleware(['auth:sanctum', 'roleType:Admin'])->group(function () {
        Route::put('/change-password', [AdminMeController::class, 'changePassword']);
        Route::get('/profile', [AdminMeController::class, 'profile']);
        Route::put('/update-profile', [AdminMeController::class, 'updateProfile']);

        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/permission', [AdminPermissionController::class, 'index'])->middleware('permission:PERM_READ');

        // Route::get('/role', [AdminRoleController::class, 'index'])->middleware('permission:ROL_READ');
        // Route::get('/role/{id}', [AdminRoleController::class, 'show'])->middleware('permission:ROL_READ');
        // Route::post('/role', [AdminRoleController::class, 'store'])->middleware('permission:ROL_CREATE');
        // Route::put('/role/{id}', [AdminRoleController::class, 'update'])->middleware('permission:ROL_UPDATE');
        // Route::delete('/role/{id}', [AdminRoleController::class, 'destroy'])->middleware('permission:ROL_DELETE');

        // Route::get('/user', [AdminUserController::class, 'index'])->middleware('permission:USR_READ');
        // Route::get('/user/{id}', [AdminUserController::class, 'show'])->middleware('permission:USR_READ');
        // Route::post('/user', [AdminUserController::class, 'store'])->middleware('permission:USR_CREATE');
        // Route::put('/user/{id}', [AdminUserController::class, 'update'])->middleware('permission:USR_UPDATE');
        // Route::delete('/user/{id}', [AdminUserController::class, 'destroy'])->middleware('permission:USR_DELETE');

        // Route::get('/negara', [AdminNegaraController::class, 'index'])->middleware('permission:NGR_READ');
        // Route::get('/negara/{id}', [AdminNegaraController::class, 'show'])->middleware('permission:NGR_READ');
        // Route::post('/negara', [AdminNegaraController::class, 'store'])->middleware('permission:NGR_CREATE');
        // Route::put('/negara/{id}', [AdminNegaraController::class, 'update'])->middleware('permission:NGR_UPDATE');
        // Route::delete('/negara/{id}', [AdminNegaraController::class, 'destroy'])->middleware('permission:NGR_DELETE');

        // Route::get('/lokasi', [AdminLokasiController::class, 'index'])->middleware('permission:LKS_READ');
        // Route::get('/lokasi/{id}', [AdminLokasiController::class, 'show'])->middleware('permission:LKS_READ');
        // Route::post('/lokasi', [AdminLokasiController::class, 'store'])->middleware('permission:LKS_CREATE');
        // Route::put('/lokasi/{id}', [AdminLokasiController::class, 'update'])->middleware('permission:LKS_UPDATE');
        // Route::delete('/lokasi/{id}', [AdminLokasiController::class, 'destroy'])->middleware('permission:LKS_DELETE');

        // Route::get('/mata-pelajaran', [AdminMataPelajaranController::class, 'index'])->middleware('permission:MPL_READ');
        // Route::get('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'show'])->middleware('permission:MPL_READ');
        // Route::post('/mata-pelajaran', [AdminMataPelajaranController::class, 'store'])->middleware('permission:MPL_CREATE');
        // Route::put('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'update'])->middleware('permission:MPL_UPDATE');
        // Route::delete('/mata-pelajaran/{id}', [AdminMataPelajaranController::class, 'destroy'])->middleware('permission:MPL_DELETE');

        // Route::get('/kelas', [AdminKelasController::class, 'index'])->middleware('permission:KLS_READ');
        // Route::get('/kelas/{id}', [AdminKelasController::class, 'show'])->middleware('permission:KLS_READ');
        // Route::post('/kelas', [AdminKelasController::class, 'store'])->middleware('permission:KLS_CREATE');
        // Route::put('/kelas/{id}', [AdminKelasController::class, 'update'])->middleware('permission:KLS_UPDATE');
        // Route::delete('/kelas/{id}', [AdminKelasController::class, 'destroy'])->middleware('permission:KLS_DELETE');

        // Route::get('/notifikasi', [AdminNotifikasiController::class, 'index'])->middleware('permission:NOT_READ');
        // Route::get('/notifikasi/{id}', [AdminNotifikasiController::class, 'show'])->middleware('permission:NOT_READ');
        // Route::post('/notifikasi', [AdminNotifikasiController::class, 'store'])->middleware('permission:NOT_CREATE');
        // Route::put('/notifikasi/{id}', [AdminNotifikasiController::class, 'update'])->middleware('permission:NOT_UPDATE');
        // Route::delete('/notifikasi/{id}', [AdminNotifikasiController::class, 'destroy'])->middleware('permission:NOT_DELETE');

        // Route::get('/sektor', [AdminSektorController::class, 'index'])->middleware('permission:SKT_READ');
        // Route::get('/sektor/{id}', [AdminSektorController::class, 'show'])->middleware('permission:SKT_READ');
        // Route::post('/sektor', [AdminSektorController::class, 'store'])->middleware('permission:SKT_CREATE');
        // Route::put('/sektor/{id}', [AdminSektorController::class, 'update'])->middleware('permission:SKT_UPDATE');
        // Route::delete('/sektor/{id}', [AdminSektorController::class, 'destroy'])->middleware('permission:SKT_DELETE');

        // Route::get('/jenis-pekerjaan', [AdminJenisPekerjaanController::class, 'index'])->middleware('permission:JPK_READ');
        // Route::get('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'show'])->middleware('permission:JPK_READ');
        // Route::post('/jenis-pekerjaan', [AdminJenisPekerjaanController::class, 'store'])->middleware('permission:JPK_CREATE');
        // Route::put('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'update'])->middleware('permission:JPK_UPDATE');
        // Route::delete('/jenis-pekerjaan/{id}', [AdminJenisPekerjaanController::class, 'destroy'])->middleware('permission:JPK_DELETE');

        Route::get('/izin', [AdminIzinController::class, 'index'])->middleware('permission:IZN_READ');
        Route::get('/izin/{id}', [AdminIzinController::class, 'show'])->middleware('permission:IZN_READ');
        Route::put('/izin{id}', [AdminIzinController::class, 'update'])->middleware('permission:IZN_UPDATE');
        Route::delete('/izin{id}', [AdminIzinController::class, 'destroy'])->middleware('permission:IZN_DELETE');

        Route::get('/cpmi', [AdminCpmiController::class, 'index'])->middleware('permission:USR_READ');
        Route::get('/cpmi/{id}', [AdminCpmiController::class, 'show'])->middleware('permission:USR_READ');
        Route::post('/cpmi', [AdminCpmiController::class, 'store'])->middleware('permission:USR_CREATE');
        Route::put('/cpmi/{id}', [AdminCpmiController::class, 'update'])->middleware('permission:USR_UPDATE');
        Route::delete('/cpmi/{id}', [AdminCpmiController::class, 'destroy'])->middleware('permission:USR_DELETE');
    });
});

Route::prefix('cpmi')->group(function () {
    Route::post('/login', [CpmiAuthController::class, 'login']);
    Route::post('/registrasi', [CpmiAuthController::class, 'registrasi']);
    Route::get('/lokasi', [CpmiOtherController::class, 'getLokasi']);
    Route::get('/negara', [CpmiOtherController::class, 'getNegara']);

    Route::middleware(['auth:sanctum', 'roleType:CPMI'])->group(function () {
        Route::put('/change-password', [CpmiMeController::class, 'changePassword']);
        Route::get('/profile', [CpmiMeController::class, 'profile']);
        Route::put('/update-profile', [CpmiMeController::class, 'updateProfile']);

        Route::post('/logout', [CpmiAuthController::class, 'logout']);

        Route::get('/absensi', [CpmiAbsensiController::class, 'index']);
        Route::post('/absensi', [CpmiAbsensiController::class, 'store']);

        Route::get('/piket', [CpmiPiketController::class, 'index']);
        Route::get('/piket/{id}', [CpmiPiketController::class, 'show']);
        Route::post('/piket', [CpmiPiketController::class, 'store']);

        Route::get('/izin', [CpmiIzinController::class, 'index']);
        Route::get('/izin/{id}', [CpmiIzinController::class, 'show']);
        Route::post('/izin', [CpmiIzinController::class, 'store']);

        Route::get('/jadwal-pelajaran', [CpmiJadwalPelajaranController::class, 'index']);

        Route::get('/pengalaman-kerja', [CpmiPengalamanKerjaController::class, 'index']);
        Route::get('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'show']);
        Route::post('/pengalaman-kerja', [CpmiPengalamanKerjaController::class, 'store']);
        Route::put('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'update']);
        Route::delete('/pengalaman-kerja/{id}', [CpmiPengalamanKerjaController::class, 'destroy']);
    });
});

Route::prefix('pengajar')->middleware('roleType:Pengajar')->group(function () {
    Route::post('/login', [PengajarAuthController::class, 'login']);

    Route::middleware(['auth:sanctum', 'roleType:Pengajar'])->group(function () {
        Route::put('/change-password', [PengajarMeController::class, 'changePassword']);
        Route::get('/profile',[PengajarMeController::class, 'profile']);
        Route::put('/update-profile', [PengajarMeController::class, 'updateProfile']);

        Route::post('/logout', [PengajarAuthController::class, 'logout']);

        Route::get('/jadwal-pelajaran', [PengajarJadwalPelajaranController::class, 'index']);
        Route::get('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'show']);
        Route::post('/jadwal-pelajaran', [PengajarJadwalPelajaranController::class, 'store']);
        Route::put('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'update']);
        Route::delete('/jadwal-pelajaran/{id}', [PengajarJadwalPelajaranController::class, 'destroy']);
    });
});
