<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventSchedule;
class EventScheduleController extends Controller
{
    public function store(Request $request, $eventId)
    {
        $request->validate([
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_time',
        ]);

        $event = Event::findOrFail($eventId);

        $event->schedules()->create([
            'start_datetime' => $request->start_time,
            'end_datetime' => $request->end_time,
        ]);

        return response()->json(['message' => 'Horario agregado con éxito']);
    }

    public function index($eventId)
    {
        $event = Event::with('schedules')->findOrFail($eventId);
        return response()->json($event->schedules);
    }

    public function destroy($scheduleId)
    {
        $schedule = EventSchedule::findOrFail($scheduleId);
        $schedule->delete();

        return response()->json(['message' => 'Horario eliminado']);
    }
}