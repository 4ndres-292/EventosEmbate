<?php

namespace App\Http\Controllers\DataFilling;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TypeEntrepreneurship;

class TypeEntrepreneurshipController extends Controller
{
    public function index()
    {
        return response()->json(TypeEntrepreneurship::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type = TypeEntrepreneurship::create([
            'name' => $request->name,
        ]);

        return response()->json($type, 201);
    }

    public function show($id)
    {
        $type = TypeEntrepreneurship::find($id);

        if (!$type) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($type);
    }

    public function update(Request $request, $id)
    {
        $type = TypeEntrepreneurship::find($id);

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

    public function destroy($id)
    {
        $type = TypeEntrepreneurship::find($id);

        if (!$type) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $type->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
