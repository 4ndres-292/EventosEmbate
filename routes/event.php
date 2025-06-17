<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Event\EventScheduleController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {

  Route::get('event-create', [EventController::class, 'create'])
    ->name('event-create');
  Route::post('event-create', [EventController::class, 'store']);


  Route::get('event-edit/{event}', [EventController::class, 'edit'])
    ->name('event-edit');
  Route::post('event-update/{event}', [EventController::class, 'update']);
  Route::delete('event-delete/{event}', [EventController::class, 'destroy']);
  Route::get('all-events', [EventController::class, 'all'])->name('event.all');
  Route::get('/eventos/{id}/registrados', [EventController::class, 'verRegistrados'])->name('eventos.verRegistrados');
});

Route::get('/events/{eventId}/schedules', [EventScheduleController::class, 'index']);
Route::post('/events/{eventId}/schedules', [EventScheduleController::class, 'store']);
Route::delete('/schedules/{scheduleId}', [EventScheduleController::class, 'destroy']);