<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Event\InformationController;
use Inertia\Inertia;

Route::get('/events', [EventController::class, 'events_home'])->name('events');
Route::get('/services', [InformationController::class, 'services'])->name('services');
Route::get('/whoWeAre', [InformationController::class, 'whoWeAre'])->name('whoWeAre');
Route::get('/event-detail/{id}', [EventController::class, 'getEventById']);
Route::get('/events/{id}/registered-users', [EventController::class, 'registeredUsers'])
    ->name('events.registeredUsers')
    ->middleware('auth');
Route::get('/admin/eventos/buscar', [EventController::class, 'search'])->name('events.search');

Route::middleware('auth')->group(function () {
    Route::get('/events/registered', [EventController::class, 'getRegisteredEvents']);
    Route::post('/events/{id}/register', [EventController::class, 'register']);
    Route::delete('/events/{id}/unregister', [EventController::class, 'unregister']);
});
