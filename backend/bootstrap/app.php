<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Exception $e, $request) {
            $code    = 500;
            $message = 'Terjadi kesalahan pada server';
            $errors  = $e->getMessage();

            if ($e instanceof AuthenticationException) {
                $code    = 401;
                $message = 'Tidak terautentikasi';
                $errors  = null;
            }

            if ($e instanceof UnauthorizedException) {
                $code    = 403;
                $message = 'Tidak memiliki izin';
                $errors  = null;
            }

            if ($e instanceof ValidationException) {
                $code    = 422;
                $message = 'Validasi gagal';
                $errors  = $e->validator->errors()->toArray();
            }

            if ($e instanceof NotFoundHttpException) {
                $code    = 404;
                $message = 'Data tidak ditemukan';
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
