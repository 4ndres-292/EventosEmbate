<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'area',
        'location',
        'representative',
        'email',
        'phone',
        'logo',
        'password'
    ];

    protected $hidden = [
        'password', // para que no se exponga en JSON
    ];
    
    public function users()
    {
        return $this->hasMany(User::class);
    }

}