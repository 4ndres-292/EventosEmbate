<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSchedule extends Model
{
    protected $fillable = [
        'start_datetime', 
        'end_datetime',
        'event_id'
    ];
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}