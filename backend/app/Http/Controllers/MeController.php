<?php
namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;

class MeController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Ubah password user
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $this->userService->changePassword($request);

        return $this->successResponse(null, 'Password berhasil diubah');
    }

    /**
     * Get user profile
     */
    public function profile(): JsonResponse
    {
        $user = $this->userService->profile();

        return $this->successResponse($user, 'Profile berhasil diambil');
    }

    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->userService->updateProfile($request);

        return $this->successResponse($user, 'Profile berhasil diupdate');
    }
}
