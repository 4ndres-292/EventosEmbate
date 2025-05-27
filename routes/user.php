<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Event\EventController;

Route::get('/events', [EventController::class, 'events_home']);