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
        $events = Event::with('user')->get(); // si quieres incluir el propietario (relación)
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
        // Validación mejorada
        $validated = $request->validate([
            'name_event' => 'required|string|max:255',
            'description_event' => 'required|string',
            'image_event' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB máximo
            'date_event' => 'required|date',
            'location' => 'required|string',
        ]);

        $validated['owner'] = Auth::user()->email;

        // Manejo de la imagen
        if ($request->hasFile('image_event')) {
            $image = $request->file('image_event');

            $imageName = Str::slug($request->name_event) . '-' . time() . '.' . $image->getClientOriginalExtension();

            // Guardar imagen en storage/app/public/events
            $imagePath = $image->storeAs('events', $imageName, 'public');

            // Guardar ruta relativa en la base de datos
            $validated['image_event'] = 'storage/events/' . $imageName;
        }

        try {
            $event = Event::create($validated);
            return Redirect::route('home')->with('success', 'Evento creado con éxito');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Ocurrió un error al crear el evento');
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
        return Inertia::render('admin/event-edit', [
            'event' => $event,
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
        'date_event' => 'required|date',
        'location' => 'required|string',
    ];

    if ($request->hasFile('image_event')) {
        $rules['image_event'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
    }

    $validated = $request->validate($rules);

    if ($request->hasFile('image_event')) {
        $image = $request->file('image_event');
        $imageName = Str::slug($request->name_event) . '-' . time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('events', $imageName, 'public');
        $validated['image_event'] = 'storage/events/' . $imageName;
    }

    $validated['edited_by'] = Auth::user()->email;

    try {
        $event->update($validated);
        return Redirect::route('home')->with('success', 'Evento actualizado con éxito');
    } catch (\Exception $e) {
        return Redirect::back()->with('error', 'Ocurrió un error al actualizar el evento');
    }
}




    /**
     * Remove the specified resource from storage.
     */
public function destroy(Event $event)
{
    try {
        // Eliminar la imagen del servidor si existe
        if ($event->image_event) {
            Storage::delete('public/' . $event->image_event);
        }

        // Guardar quién lo eliminó
        $event->deleted_by = Auth::user()->email;
        $event->save();

        // Soft delete
        $event->delete();

        return Redirect::route('home')->with('success', 'Evento eliminado con éxito');
    } catch (\Exception $e) {
        return Redirect::back()->with('error', 'Ocurrió un error al eliminar el evento');
    }
}


    public function all()
    {
        $eventos = Event::all(); // o con paginación si quieres
        return Inertia::render('admin/all-events', [
            'eventos' => $eventos,
        ]);
    }

    public function events_home()
    {
        // 1. Obtener eventos (igual que antes)
        $eventos = Event::orderBy('date_event', 'desc')->take(3)->get();

        // 2. Si hay usuario autenticado, obtener sus eventos inscritos
        $inscritosIds = [];
        if ($user = auth()->user()) {
            // pluck('event_id') devuelve un Collection de IDs
            $inscritosIds = $user->events()->pluck('event_id')->toArray();
        }

        // 3. Enviamos ambos (eventos + inscritos)
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
        $event = Event::with('user')->find($id);

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

        $events = $query->with('user')->get();

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
    $users = $event->users()->select('users.id', 'users.name', 'users.email', 'users.phone', 'users.gender', 'users.type_participant')->get();

    return Inertia::render('SeeRegistered', [
        'event' => $event,
        'users' => $users,
    ]);
}


}