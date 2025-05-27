<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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


        $event = Event::create($validated);

        return response()->json(['message' => 'Evento creado con éxito', 'event' => $event], 201);
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
        // Validación
        $validated = $request->validate([
            'name_event' => 'required|string|max:255',
            'description_event' => 'required|string',
            'image_event' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date_event' => 'required|date',
            'location' => 'required|string'
        ]);

        // Actualizar la imagen si es que se sube una nueva
        if ($request->hasFile('image_event')) {
            $image = $request->file('image_event');
            $imageName = Str::slug($request->name_event) . '-' . time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('app/public/events', $imageName);
            $validated['image_event'] = 'events/' . $imageName;
        }

        // Actualizar el evento
        $validated['edited_by'] = Auth::user()->email;
        $event->update($validated);

        return response()->json(['message' => 'Evento actualizado con éxito', 'event' => $event], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Eliminar la imagen del servidor si existe
        if ($event->image_event) {
            Storage::delete('public/' . $event->image_event);
        }

        // Eliminar el evento
        $event->deleted_by = Auth::user()->email;
        $event->save();

        $event->delete(); // Soft delete

        return response()->json(['message' => 'Evento eliminado con éxito']);
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
        $eventos = Event::orderBy('date_event', 'desc')->take(3)->get();

        return Inertia::render('users/events', [
            'eventos' => $eventos,
        ]);
    }
    public function registerToEvent(Request $request, $eventId)
    {
        $user = auth()->user();
        $user->events()->attach($eventId);

        return response()->json(['message' => 'Usuario inscrito al evento correctamente']);
    }

    
    public function register(Request $request, $id)
        {
            $user = $request->user();
            $event = Event::findOrFail($id);

            // Evitar duplicados
            if (!$user->events->contains($event->id)) {
                $user->events()->attach($event->id);
            }

            return response()->json([
                'message' => 'Usuario inscrito correctamente',
                'email' => $user->email
            ]);
        }
}