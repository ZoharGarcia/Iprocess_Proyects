<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'type',
        'price',
        'max_users',
        'max_devices'
    ];
    public function companies()
    {
        return $this->hasMany(Company::class);
    }

}
