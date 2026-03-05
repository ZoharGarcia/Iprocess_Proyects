<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'type',
        'name',
        'vendor',
        'model',
        'serial',
        'area',
        'status',
        'last_seen_at',
        'device_token'
    ];

    protected $casts = [
        'last_seen_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($device) {
            if (!$device->device_token) {
                $device->device_token = Str::uuid();
            }
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function apiKeys()
    {
        return $this->hasMany(DeviceApiKey::class);
    }
}