<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TypeEntrepreneurship extends Model
{
    use HasFactory;
    protected $table = 'type_entrepreneurship';
    protected $fillable = [
        'name',
    ];
}