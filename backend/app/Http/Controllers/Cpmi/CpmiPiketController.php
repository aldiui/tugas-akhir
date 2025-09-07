<?php
namespace App\Http\Controllers\Cpmi;

use App\Http\Controllers\Controller;
use App\Http\Requests\CpmiPiketRequest;
use App\Services\PiketService;
use Illuminate\Http\JsonResponse;

class CpmiPiketController extends Controller
{
    protected $piketService;

    public function __construct(PiketService $piketService)
    {
        $this->piketService = $piketService;
    }

    /**
     * Tambah data piket baru
     */
    public function store(CpmiPiketRequest $request): JsonResponse
    {
        $piket = $this->piketService->create($request->validated());

        return $this->successResponse($piket, 'Data piket berhasil ditambahkan', 201);
    }
}
