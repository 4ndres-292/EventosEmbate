<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name_event', 'description_event', 'image_event', 'date_event', 'owner', 'ubication',];
    protected $dates = ['deleted_at'];
}
