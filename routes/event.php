<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Event\EventController;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {

  Route::get('event-create', [EventController::class, 'create'])
    ->name('event-create');
  Route::post('event-create', [EventController::class, 'store']);


  Route::get('event-edit/{event}', [EventController::class, 'edit'])
    ->name('event-edit');
  Route::put('event-update/{event}', [EventController::class, 'update']);
  Route::delete('event-delete/{event}', [EventController::class, 'destroy']);
  Route::get('all-events', [EventController::class, 'all'])->name('event.all');
  Route::get('/eventos/{id}/registrados', [EventController::class, 'verRegistrados'])->name('eventos.verRegistrados');
});