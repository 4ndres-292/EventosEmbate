<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    /**
     * Mostrar la vista del formulario.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('settings/companyProfiles', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Guardar una nueva compañía.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'area' => 'required|string',
            'location' => 'required|string',
            'representative' => 'required|string',
            'email' => 'required|email|unique:company_profiles,email',
            'phone' => 'required|string|max:20',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // imagen válida opcional
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Manejar carga de imagen si existe
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('companies', 'public');
        }

        $company = Company::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'area' => $validated['area'],
            'location' => $validated['location'],
            'representative' => $validated['representative'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'logo' => $logoPath, // guardamos la ruta si hubo archivo
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Empresa registrada correctamente.',
            'company' => $company,
        ], 201);
    }

    public function choose()
    {
        $companies = Company::select('id', 'name')->get();

        return Inertia::render('settings/joinOrCreateCompany', [
            'companies' => $companies,
        ]);
    }

    public function join(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:company_profiles,id',
        ]);

        $user = $request->user();
        $user->company_id = $request->company_id;
        $user->save();

        return redirect()->route('home')->with('success', '¡Te has unido a una empresa!');
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2',
        ]);

        $query = $request->query('query');

        $companies = Company::where('name', 'like', '%' . $query . '%')
            ->select('id', 'name')
            ->limit(10)
            ->get();

        return response()->json($companies);
    }

}