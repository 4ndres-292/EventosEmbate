<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Event\EventController;
use Inertia\Inertia;

Route::get('/events', [EventController::class, 'events_home'])->name('events');
