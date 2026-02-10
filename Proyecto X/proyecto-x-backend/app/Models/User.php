<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable;

    /**
     * Los atributos que pueden ser asignados en masa
     * (coinciden con las columnas de la tabla users)
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
    ];

    /**
     * Los atributos que deben ocultarse al serializar
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casts según el schema
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
