<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckUserLimit;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->alias([
            'super.admin'   => \App\Http\Middleware\SuperAdminMiddleware::class,
            'company.active'=> \App\Http\Middleware\EnsureCompanyIsActive::class,
            'owner.only'    => \App\Http\Middleware\EnsureUserIsOwner::class,
            'plan.business' => \App\Http\Middleware\EnsureBusinessPlan::class,
        ]);

        $middleware->alias([
            'check.user.limit' => CheckUserLimit::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
