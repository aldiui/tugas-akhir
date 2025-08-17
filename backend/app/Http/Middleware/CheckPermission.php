<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, string $permissionCode): Response
    {
        $user = $request->user();

        if (! $user) {
            throw new AuthenticationException('Tidak terautentikasi');
        }

        $role = $user->role;
        if (! $role) {
            throw new AuthorizationException('User tidak memiliki role');
        }

        $permissions = $role->permissions()
            ->pluck('kode')
            ->toArray();

        if (! in_array($permissionCode, $permissions)) {
            throw new AuthorizationException('Tidak memiliki izin');
        }

        return $next($request);
    }
}
