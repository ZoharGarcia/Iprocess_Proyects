<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Console\Scheduling\Schedule;

// Importa todos los middlewares para usar nombres cortos
use App\Http\Middleware\SuperAdminMiddleware;
use App\Http\Middleware\EnsureCompanyIsActive;
use App\Http\Middleware\EnsureUserIsOwner;
use App\Http\Middleware\EnsureBusinessPlan;
use App\Http\Middleware\EnsureNoCompanyAssigned;
use App\Http\Middleware\CheckUserLimit;
use App\Http\Middleware\EnsureUserHasCompany;
// 👇 1. Importamos la nueva clase aquí
use App\Http\Middleware\EnsureCompanySubscriptionIsActive;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->alias([
            'super.admin'         => SuperAdminMiddleware::class,
            'company.active'      => EnsureCompanyIsActive::class,
            'owner.only'          => EnsureUserIsOwner::class,
            'plan.business'       => EnsureBusinessPlan::class,
            'no.company.assigned' => EnsureNoCompanyAssigned::class,
            'check.user.limit'    => CheckUserLimit::class,
            'has.company'         => EnsureUserHasCompany::class,
            'sub.active'          => EnsureCompanySubscriptionIsActive::class,
            'device.key' => \App\Http\Middleware\DeviceKeyMiddleware::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('companies:deactivate-expired')->hourly();
    })
    ->create();