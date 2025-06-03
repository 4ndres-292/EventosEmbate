<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TypeUser;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:15',  // Agregar validación de teléfono
            'gender' => 'required|string|in:Masculino,Femenino', // Validar género (true o false)
            'birthdate' => 'required|date', // Validar fecha de nacimiento
            'type_participant' => 'required|string|max:25', // Asegurar que type_participant sea un array
            //'type_participant.*' => 'in:Estudiante,Universitario,Docente,Administrativo,Emprendedor,Empresario', // Validar cada tipo
            'career' => 'nullable|string|max:25', // Validar carrera
            //'career.*' => 'in:Ingeniería de Sistemas,Ingeniería Electrónica,Ingeniería Industrial,Ingeniería Civil,Ingeniería Mecánica', // Validar cada carrera
            'institution' => 'required|string|max:255', // Validar institución
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'type_participant' => $request->type_participant,
            'career' => $request->career,
            'institution' => $request->institution,
            'type_user_id' => TypeUser::where('name', 'Estudiante')->value('id') ?? 3,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('events');
    }
}