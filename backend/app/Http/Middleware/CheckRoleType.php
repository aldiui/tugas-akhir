<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleType
{
    public function handle(Request $request, Closure $next, string $roleType): Response
    {
        $user = $request->user();

        if (! $user) {
            throw new AuthenticationException('Tidak terautentikasi');
        }

        $role = $user->role;
        if (! $role) {
            throw new AuthorizationException('User tidak memiliki role');
        }

        $roleType = strtoupper($roleType);

        if (! in_array($roleType, ['CPMI', 'PENGAJAR', 'ADMIN'])) {
            throw new AuthorizationException('Role type tidak valid');
        }

        if ($role->type !== $roleType) {
            throw new AuthorizationException('Tidak memiliki izin');
        }

        return $next($request);
    }
}
