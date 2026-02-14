<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'plan',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    /*
    |--------------------------------------------------------------------------
    | Relaciones
    |--------------------------------------------------------------------------
    */
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers SaaS
    |--------------------------------------------------------------------------
    */

    public function isActive(): bool
    {
        return $this->is_active;
    }

    public function isBusiness(): bool
    {
        return $this->plan === 'business';
    }

    public function devices()
{
    return $this->hasMany(Device::class);
}

    public function isIndividual(): bool
    {
        return $this->plan === 'individual';
    }
}
