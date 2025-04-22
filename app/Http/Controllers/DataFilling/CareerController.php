<?php

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\Career;
use App\Http\Controllers\Controller;

class CareerController extends Controller
{
    public function index()
    {
        return response()->json(Career::all());
    }
}
