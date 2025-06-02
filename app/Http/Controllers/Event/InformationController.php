<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InformationController extends Controller
{
    public function services()
    {
        return Inertia::render('users/services');
    }
    public function whoWeAre()
    {
        return Inertia::render('users/whoWeAre');
    }
}
