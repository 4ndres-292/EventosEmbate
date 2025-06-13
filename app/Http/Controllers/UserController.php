<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('admin/grant-permits', [
            'users' => $users,
        ]);
    }

    public function updateRole(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'type_user_id' => 'required|in:1,2,3', // 1 = admin, 2 = supervisor, 3 = estudiante
        ]);

        $user = User::where('email', $request->email)->first();
        $user->type_user_id = $request->type_user_id;
        $user->save();

        return response()->json(['message' => 'Rol actualizado correctamente']);
    }

        // app/Http/Middleware/AdminMiddleware.php
    public function handle($request, Closure $next)
    {
        if (auth()->check() && auth()->user()->type_user_id === 1) {
            return $next($request);
        }

        return abort(403, 'No autorizado');
    }

}
