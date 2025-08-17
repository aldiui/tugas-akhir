<?php

use App\Http\Middleware\CheckPermission;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'permission' => CheckPermission::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Exception $e, $request) {
            $code    = 500;
            $message = $e->getMessage() ?: 'Terjadi kesalahan pada server';
            $errors  = null;

            if ($e instanceof AuthenticationException) {
                $code    = 401;
                $message = $e->getMessage() ?: 'Tidak terautentikasi';
                $errors  = null;
            }

            if ($e instanceof UnauthorizedException) {
                $code    = 403;
                $message = $e->getMessage() ?: 'Tidak memiliki izin';
                $errors  = null;
            }

            if ($e instanceof ValidationException) {
                $code    = 422;
                $message = $e->getMessage() ?: 'Validasi gagal';
                $errors  = $e->validator->errors()->toArray();
            }

            if ($e instanceof NotFoundHttpException) {
                $code    = 404;
                $message = $e->getMessage() ?: 'Data tidak ditemukan';
                $errors  = null;
            }

            if ($request->expectsJson()) {
                return response()->json([
                    'status'  => false,
                    'message' => $message,
                    'data'    => $errors,
                ], $code);
            }
        });
    })->create();
