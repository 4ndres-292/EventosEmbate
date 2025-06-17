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
        'user_id' => 'required|exists:users,id',
        'type_user_id' => 'required|in:1,2,3',
    ]);

    $user = User::findOrFail($request->user_id);
    $user->type_user_id = $request->type_user_id;
    $user->save();

    return response()->json(['message' => 'Rol actualizado correctamente']);
}


  public function searchByEmail(Request $request)
{
    try {
        $request->validate(['email' => 'nullable|string']);
        $query = User::query();
        if ($request->email) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
        $users = $query->get(['id', 'name', 'email', 'type_user_id']);
        return response()->json($users);
    } catch (\Exception $e) {
        \Log::error('searchByEmail error: '.$e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


}
