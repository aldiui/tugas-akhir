<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\NegaraController;

Route::get('/negara', [NegaraController::class, 'index']);
Route::get('/negara/{id}', [NegaraController::class, 'show']);
Route::post('/negara', [NegaraController::class, 'store']);
Route::put('/negara/{id}', [NegaraController::class, 'update']);
Route::delete('/negara/{id}', [NegaraController::class, 'destroy']);

Route::get('/lokasi', [LokasiController::class, 'index']);
Route::get('/lokasi/{id}', [LokasiController::class, 'show']);
Route::post('/lokasi', [LokasiController::class, 'store']);
Route::put('/lokasi/{id}', [LokasiController::class, 'update']);
Route::delete('/lokasi/{id}', [LokasiController::class, 'destroy']);


