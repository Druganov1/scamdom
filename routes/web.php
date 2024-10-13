<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\testEvent;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\LiveChatController;
use App\Console\Commands\RouletteTimer;
use App\Http\Controllers\Games\MinesweeperController;
use App\Http\Controllers\BetsController;


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
    ->middleware(['auth', 'verified'])
    ->as('games.') // Middleware to apply
    ->group(function () {
        Route::get('/roulette', function () {
            return Inertia::render('Games/Roulette');
        })->name('roulette');
        Route::get('/mines', function () {
            return Inertia::render('Games/Mines');
        })->name('mines');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/bets', [BetsController::class, 'show'])->name('profile.bets');

});


Route::prefix('api') // Prefix for all routes
    ->middleware('auth') // Middleware to apply
    ->group(function () {
        Route::post('/add-funds', [BalanceController::class, 'addFunds'])->name('api.addfunds');
        Route::post('/roulette/init', [RouletteTimer::class, 'init'])->name('api.roulette-init');
        Route::post('/minesweeper/start', [MinesweeperController::class, 'StartGame'])->name('api.mineweeper-start');
        Route::post('/minesweeper/clicktile', [MinesweeperController::class, 'ClickedTile'])->name('api.click-tile');
        Route::post('/minesweeper/cashout', [MinesweeperController::class, 'cashOut'])->name('api.minesweeper-cashout');

        Route::get('/wallet/balance', [BalanceController::class, 'getUserBalance'])->name('api.getBalance');
        Route::post('/chat/send', [LiveChatController::class, 'newChat'])->name('api.sendChatMessage');
        Route::get('/chat/init', [LiveChatController::class, 'init'])->name('api.getMessages');

    });

//API ROUTES



require __DIR__.'/auth.php';
