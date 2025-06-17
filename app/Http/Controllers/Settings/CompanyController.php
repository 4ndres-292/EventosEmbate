<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        // Renderiza la página companyProfiles.tsx con Inertia
        return Inertia::render('settings/companyProfiles');
    }

    public function store(Request $request)
    {
        // Validar datos entrantes
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'area' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'representative' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
        ]);

        // Guardar nueva compañía en BD
        Company::create($validated);

        // Redirigir con mensaje de éxito o a donde quieras
        return redirect()->route('companies.create')->with('success', 'Compañía creada con éxito.');
    }
}