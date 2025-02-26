<?php

use App\Http\Controllers\FrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontController::class, 'index'])->name('home');
Route::get('/{slug}', [FrontController::class, 'show'])->name('show');

if (env('APP_ENV') === 'local') {
    Route::group(
        [
            'prefix' => 'admin',
            'middleware' => ['auth', 'verified']
        ],
        function () {
            Route::get('dashboard', function () {
                return Inertia::render('admin/Dashboard');
            })->name('dashboard');
        }
    );

    require __DIR__ . '/settings.php';
    require __DIR__ . '/auth.php';
}
