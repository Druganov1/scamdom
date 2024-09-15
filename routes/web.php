<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\testEvent;
use App\Http\Controllers\BalanceController;

Route::get('/test-broadcast', function () {
    testEvent::dispatch();


    return 'Event dispatched!';
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/wallet', function () {
    return Inertia::render('Profile/Wallet');
})->middleware(['auth', 'verified'])->name('wallet');


Route::prefix('games') // Prefix for all routes
    ->middleware(['auth', 'verified']) // Middleware to apply
    ->group(function () {
        Route::get('/roulette', function () {
            return Inertia::render('Games/Roulette');
        });
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('api') // Prefix for all routes
    ->middleware('auth') // Middleware to apply
    ->group(function () {
        Route::post('/add-funds', [BalanceController::class, 'addFunds'])->name('api.addfunds');
    });

//API ROUTES


require __DIR__.'/auth.php';
