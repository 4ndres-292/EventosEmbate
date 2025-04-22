<?php

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\ParticipantType;
use App\Http\Controllers\Controller;

class ParticipantTypeController extends Controller
{
    public function index()
    {
        return response()->json(ParticipantType::all());
    }
}
