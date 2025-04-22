<?php

namespace App\Http\Controllers\DataFilling;

use Illuminate\Http\Request;
use App\Models\Institution;
use App\Http\Controllers\Controller;

class InstitutionController extends Controller
{
    public function index(){
        return response()->json(Institution::all());
    }
}
