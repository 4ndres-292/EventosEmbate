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
}