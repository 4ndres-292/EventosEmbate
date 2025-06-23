<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\CompanyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('/settings/companyProfiles', [CompanyController::class, 'index'])->name('company.profiles');
    Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');

    Route::get('/settings/joinOrCreateCompany', [CompanyController::class, 'choose'])->name('companies.choose');
    Route::post('/settings/joinOrCreateCompany/join', [CompanyController::class, 'join'])->name('companies.join');
    Route::get('/api/companies/search', [CompanyController::class, 'search'])->name('companies.search');

});