<?php

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\Career;
use App\Http\Controllers\Controller;

class CareerController extends Controller
{
    // Mostrar todos los registros
    public function index()
    {
        return response()->json(Career::all(), 200);
    }

    // Crear un nuevo registro
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $career = Career::create([
            'name' => $request->name,
        ]);

        return response()->json($career, 201);
    }

    // Mostrar un solo registro
    public function show($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career not found'], 404);
        }

        return response()->json($career, 200);
    }

    // Actualizar un registro
    public function update(Request $request, $id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $career->update([
            'name' => $request->name,
        ]);

        return response()->json($career, 200);
    }

    // Eliminar un registro
    public function destroy($id)
    {
        $career = Career::find($id);

        if (!$career) {
            return response()->json(['message' => 'Career not found'], 404);
        }

        $career->delete();

        return response()->json(['message' => 'Career deleted'], 200);
    }
}
