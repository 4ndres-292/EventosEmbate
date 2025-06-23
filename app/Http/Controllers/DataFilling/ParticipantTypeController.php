<?php

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\ParticipantType;
use App\Http\Controllers\Controller;

class ParticipantTypeController extends Controller
{
    // Obtener todos
    public function index()
    {
        return response()->json(ParticipantType::all());
    }

    // Crear nuevo
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type = ParticipantType::create([
            'name' => $request->name,
        ]);

        return response()->json($type, 201);
    }

    // Mostrar uno
    public function show($id)
    {
        $type = ParticipantType::find($id);

        if (!$type) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($type);
    }

    // Actualizar
    public function update(Request $request, $id)
    {
        $type = ParticipantType::find($id);

        if (!$type) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type->update([
            'name' => $request->name,
        ]);

        return response()->json($type);
    }

    // Eliminar
    public function destroy($id)
    {
        $type = ParticipantType::find($id);

        if (!$type) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $type->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
