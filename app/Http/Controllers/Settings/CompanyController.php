<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
class CompanyController extends Controller
{
    /**
     * Registrar una nueva empresa.
     */

    public function index(Request $request): Response
    {
        return Inertia::render('settings/companyProfiles', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'area' => 'required|string',
            'location' => 'required|string',
            'representative' => 'required|string',
            'email' => 'required|email|unique:company_profiles,email',
            'phone' => 'required|string|max:20',
            'logo' => 'nullable|string', // ruta o base64 según tu lógica
            'password' => 'required|string|min:8|confirmed',
        ]);

        $company = Company::create([
            'name' => $request->name,
            'description' => $request->description,
            'area' => $request->area,
            'location' => $request->location,
            'representative' => $request->representative,
            'email' => $request->email,
            'phone' => $request->phone,
            'logo' => $request->logo,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Empresa registrada correctamente.',
            'company' => $company,
        ], 201);
    }
}