<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('schedules', 'users')->get(); // si quieres incluir el propietario (relación)
        return Inertia::render('admin/EventList', [
            'events' => $events,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/event-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedEvent = $request->validate([
            'name_event' => 'required|string|max:255',
            'description_event' => 'required|string',
            'image_event' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'location' => 'required|string',
            'schedules' => 'required|array|min:1',
            'schedules.*.start_datetime' => 'required|date',
            'schedules.*.end_datetime' => 'required|date|after:schedules.*.start_datetime',
        ]);

        $validatedEvent['owner'] = Auth::user()->email;

        if ($request->hasFile('image_event')) {
            $image = $request->file('image_event');
            $imageName = Str::slug($request->name_event) . '-' . time() . '.' . $image->getClientOriginalExtension();
            // Guarda en disco 'public' dentro de storage/app/public/events
            $path = $image->storeAs('events', $imageName, 'public'); // ej. "events/fexco-umss-1750148966.png"
            $validatedEvent['image_event'] = $path; // almacenar solo "events/xxx.png"
        }

        \DB::beginTransaction();
        try {
            $event = Event::create($validatedEvent);
            foreach ($validatedEvent['schedules'] as $schedule) {
                $event->schedules()->create([
                    'start_datetime' => $schedule['start_datetime'],
                    'end_datetime' => $schedule['end_datetime'],
                ]);
            }
            \DB::commit();
            return Redirect::route('home')->with('success', 'Evento creado con éxito');
        } catch (\Exception $e) {
            \DB::rollback();
            return Redirect::back()->with('error', 'Error: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        $event->load('schedules');
        // Convertir ruta relativa a URL pública con Storage::url()
        $eventData = [
            'id' => $event->id,
            'name_event' => $event->name_event,
            'description_event' => $event->description_event,
            'location' => $event->location,
            'image_event' => $event->image_event ? Storage::url($event->image_event) : null,
            'schedules' => $event->schedules->map(fn($s) => [
                'id' => $s->id,
                'start_datetime' => $s->start_datetime,
                'end_datetime' => $s->end_datetime,
            ]),
        ];
        return Inertia::render('admin/event-edit', [
            'event' => $eventData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $rules = [
            'name_event' => 'required|string|max:255',
            'description_event' => 'required|string',
            'location' => 'required|string',
            'schedules' => 'sometimes|array',
            'schedules.*.id' => 'sometimes|exists:event_schedules,id',
            'schedules.*.start_datetime' => 'required_with:schedules|date',
            'schedules.*.end_datetime' => 'required_with:schedules|date|after:schedules.*.start_datetime',
        ];
        if ($request->hasFile('image_event')) {
            $rules['image_event'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
        }
        $validated = $request->validate($rules);

        if ($request->hasFile('image_event')) {
            // Eliminar anterior si existe, usando ruta relativa
            if ($event->image_event) {
                Storage::disk('public')->delete($event->image_event);
            }
            $image = $request->file('image_event');
            $imageName = Str::slug($request->name_event) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('events', $imageName, 'public');
            $validated['image_event'] = $path;
        }

        $validated['edited_by'] = Auth::user()->email;

        \DB::beginTransaction();
        try {
            $event->update($validated);

            if (isset($validated['schedules'])) {
                $existingIds = $event->schedules->pluck('id')->toArray();
                $updatedIds = [];
                foreach ($validated['schedules'] as $sData) {
                    if (isset($sData['id'])) {
                        $sched = $event->schedules()->find($sData['id']);
                        if ($sched) {
                            $sched->update([
                                'start_datetime' => $sData['start_datetime'],
                                'end_datetime' => $sData['end_datetime'],
                            ]);
                            $updatedIds[] = $sData['id'];
                        }
                    } else {
                        $new = $event->schedules()->create([
                            'start_datetime' => $sData['start_datetime'],
                            'end_datetime' => $sData['end_datetime'],
                        ]);
                        $updatedIds[] = $new->id;
                    }
                }
                $toDelete = array_diff($existingIds, $updatedIds);
                if (!empty($toDelete)) {
                    $event->schedules()->whereIn('id', $toDelete)->delete();
                }
            } else {
                $event->schedules()->delete();
            }

            \DB::commit();
            return Redirect::route('home')->with('success', 'Evento actualizado con éxito');
        } catch (\Exception $e) {
            \DB::rollback();
            return Redirect::back()->with('error', 'Error al actualizar: ' . $e->getMessage());
        }
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            if ($event->image_event) {
                Storage::disk('public')->delete($event->image_event);
            }
            $event->deleted_by = Auth::user()->email;
            $event->save();
            $event->delete();
            return Redirect::route('home')->with('success', 'Evento eliminado con éxito');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Ocurrió un error al eliminar el evento');
        }
    }


    public function all()
    {
        $eventos = Event::with('schedules')->get();
        return Inertia::render('admin/all-events', [
            'eventos' => $eventos,
        ]);
    }

    public function events_home()
    {
        // Carga eventos con schedules
        $eventos = Event::with('schedules')
            ->orderBy('date_event', 'desc')
            ->take(3)
            ->get();

        $inscritosIds = [];
        if ($user = auth()->user()) {
            $inscritosIds = $user->events()->pluck('event_id')->toArray();
        }

        return Inertia::render('users/events', [
            'eventos' => $eventos,
            'inscritos' => $inscritosIds,
        ]);
    }


    public function register(Request $request, $id)
    {
        $user = $request->user();
        $event = Event::findOrFail($id);

        // Evitar duplicados
        if (!$user->events->contains($event->id)) {
            $user->events()->attach($event->id);
        }

        // Redirige atrás con un mensaje en sesión
        return redirect()->back()->with('success', 'Usuario inscrito correctamente');
        router . reload();
    }

    public function getEventById($id)
    {
        $event = Event::with('users')->find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        return response()->json($event);
    }

    // En EventController.php
    public function registeredUsers($eventId)
    {
        $event = Event::with('users')->findOrFail($eventId);

        return Inertia::render('admin/seeRegistered', [
            'event' => $event,
            'users' => $event->users,
        ]);
    }

    public function search(Request $request)
    {
        $query = Event::query();

        // Filtro por nombre del evento (parcial)
        if ($request->filled('name_event')) {
            $query->where('name_event', 'like', '%' . $request->name_event . '%');
        }

        // Filtro por rango de fechas
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date_event', [$request->start_date, $request->end_date]);
        }

        $events = $query->with('users')->get();

        return Inertia::render('admin/EventSearchResults', [
            'events' => $events,
            'filters' => $request->only(['name_event', 'start_date', 'end_date']),
        ]);
    }

    public function isUserRegistered($eventId)
    {
        $user = auth()->user();
        return $user->events()->where('event_id', $eventId)->exists();
    }

    public function getRegisteredEvents()
    {
        $user = auth()->user();
        $eventIds = $user->events()->pluck('event_id'); // Obtener IDs
        return response()->json($eventIds);
    }

    public function unregister($id)
    {
        $user = auth()->user();
        $user->events()->detach($id);
        return redirect()->back()->with('success', 'Usuario desinscrito correctamente');
        router . reload();
    }

    public function verRegistrados($id)
    {
        // Obtener el evento por su ID
        $event = Event::findOrFail($id);

        // Obtener los usuarios registrados al evento (ajusta la relación según tu modelo)
        $users = $event->users()->select('users.id', 'users.name', 'users.email', 'users.phone', 'users.gender', 'users.birthdate', 'users.type_participant')->get();

        return Inertia::render('SeeRegistered', [
            'event' => $event,
            'users' => $users,
        ]);
    }


}