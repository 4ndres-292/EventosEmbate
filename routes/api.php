<?php

use App\Http\Controllers\DataFilling\ParticipantTypeController;
use App\Http\Controllers\DataFilling\CareerController;
use App\Http\Controllers\DataFilling\InstitutionController;
use App\Http\Controllers\DataFilling\LocationController;
use App\Http\Controllers\DataFilling\TypeEntrepreneurshipController;
use Illuminate\Support\Facades\Route;

// Rutas API para llenar datos (data filling)
Route::prefix('/api/participant-types')->group(function () {
    Route::get('/', [ParticipantTypeController::class, 'index']);
    Route::post('/', [ParticipantTypeController::class, 'store']);
    Route::get('/{id}', [ParticipantTypeController::class, 'show']);
    Route::put('/{id}', [ParticipantTypeController::class, 'update']);
    Route::delete('/{id}', [ParticipantTypeController::class, 'destroy']);
});

Route::prefix('/api/career-types')->group(function () {
    Route::get('/', [CareerController::class, 'index']);       // Listar todos
    Route::post('/', [CareerController::class, 'store']);      // Crear uno
    Route::get('/{id}', [CareerController::class, 'show']);    // Mostrar uno
    Route::put('/{id}', [CareerController::class, 'update']);  // Actualizar
    Route::delete('/{id}', [CareerController::class, 'destroy']); // Eliminar
});

Route::prefix('/api/institutions')->group(function () {
    Route::get('/', [InstitutionController::class, 'index']);
    Route::post('/', [InstitutionController::class, 'store']);
    Route::get('/{id}', [InstitutionController::class, 'show']);
    Route::put('/{id}', [InstitutionController::class, 'update']);
    Route::delete('/{id}', [InstitutionController::class, 'destroy']);
});

Route::prefix('/api/locations')->group(function () {
    Route::get('/', [LocationController::class, 'index']);
    Route::post('/', [LocationController::class, 'store']);
    Route::get('/{id}', [LocationController::class, 'show']);
    Route::put('/{id}', [LocationController::class, 'update']);
    Route::delete('/{id}', [LocationController::class, 'destroy']);
});

Route::prefix('/api/type-entrepreneurship')->group(function () {
    Route::get('/', [TypeEntrepreneurshipController::class, 'index']);
    Route::post('/', [TypeEntrepreneurshipController::class, 'store']);
    Route::get('/{id}', [TypeEntrepreneurshipController::class, 'show']);
    Route::put('/{id}', [TypeEntrepreneurshipController::class, 'update']);
    Route::delete('/{id}', [TypeEntrepreneurshipController::class, 'destroy']);
});
