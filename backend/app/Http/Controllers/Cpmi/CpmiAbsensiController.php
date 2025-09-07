<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Http\Requests\CpmiAbsensiRequest;
use App\Services\AbsensiService;
use Illuminate\Http\JsonResponse;

class CpmiAbsensiController extends Controller
{
    protected $absensiService;

    public function __construct(AbsensiService $absensiService)
    {
        $this->absensiService = $absensiService;
    }

    /**
     * Tambah data absensi baru
     */
    public function store(CpmiAbsensiRequest $request): JsonResponse
    {
        $absensi = $this->absensiService->create($request->validated());

        return $this->successResponse($absensi['data'], $absensi['message'], isset($absensi['data']['jam_keluar']) ? 200 : 201);
    }
}
