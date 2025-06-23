<?php 

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\Institution;
use App\Http\Controllers\Controller;

class InstitutionController extends Controller
{
    public function index()
    {
        return response()->json(Institution::all());
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $institution = Institution::create(['name' => $request->name]);
        return response()->json($institution, 201);
    }

    public function show($id)
    {
        $institution = Institution::find($id);
        return $institution ? response()->json($institution) : response()->json(['message' => 'Not found'], 404);
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::find($id);
        if (!$institution) return response()->json(['message' => 'Not found'], 404);
        $request->validate(['name' => 'required|string|max:255']);
        $institution->update(['name' => $request->name]);
        return response()->json($institution);
    }

    public function destroy($id)
    {
        $institution = Institution::find($id);
        if (!$institution) return response()->json(['message' => 'Not found'], 404);
        $institution->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
