<?php

use App\Http\Controllers\DataFilling\ParticipantTypeController;
use App\Http\Controllers\DataFilling\CareerController;
use App\Http\Controllers\DataFilling\InstitutionController;
use App\Http\Controllers\DataFilling\LocationController;
use App\Http\Controllers\DataFilling\TypeEntrepreneurshipController;
use Illuminate\Support\Facades\Route;

// Rutas API para llenar datos (data filling)
Route::get('/api/participant-types', [ParticipantTypeController::class, 'index']);
Route::get('/api/career-types', [CareerController::class, 'index']);
Route::get('/api/institutions', [InstitutionController::class, 'index']);
Route::get('/api/locations', [LocationController::class, 'index']);
Route::get('/api/typeEntrepreneurship', [TypeEntrepreneurshipController::class, 'index']);