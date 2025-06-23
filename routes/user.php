<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Event\InformationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Settings\CompanyController;

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

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/grant-permits', [UserController::class, 'index']); // vista principal
    Route::get('/users/search', [UserController::class, 'searchByEmail']); // búsqueda ajax
    Route::post('/users/update-role', [UserController::class, 'updateRole']); // actualización rol
});
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/career-types', function () {
        return Inertia::render('admin/CareerTypes');
    })->name('admin.career-types');

    Route::get('/admin/institutions', function () {
        return Inertia::render('admin/Institutions');
    })->name('admin.institutions');

    Route::get('/admin/locations', function () {
        return Inertia::render('admin/Locations');
    })->name('admin.locations');

    Route::get('/admin/participant-types', function () {
        return Inertia::render('admin/ParticipantTypes');
    })->name('admin.participant-types');

    Route::get('/admin/type-entrepreneurship', function () {
        return Inertia::render('admin/TypeEntrepreneurship');
    })->name('admin.typeEntrepreneurship');
});