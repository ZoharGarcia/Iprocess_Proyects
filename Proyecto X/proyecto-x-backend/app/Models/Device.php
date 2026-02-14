<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        'name',
        'company_id',
        'device_token'
    ];

    /**
     * Relación con empresa
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
