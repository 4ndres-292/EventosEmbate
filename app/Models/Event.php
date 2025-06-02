<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name_event', 'description_event', 'image_event', 'date_event', 'owner', 'location',];
    protected $dates = ['deleted_at'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }

     public function user()
    {
        return $this->belongsTo(User::class, 'id_user'); // asegúrate que 'id_user' es la clave foránea correcta
    }
}