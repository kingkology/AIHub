<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FinancialAnalysisController;
use App\Http\Controllers\HealthcareController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

// Dashboard routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Define routes for each role-based dashboard
    Route::get('/dashboards/admin', function () {
        $user = Auth::user();
        if ($user->user_type !== 'admin') {
            abort(403, 'Unauthorized');
        }
        return view('admin.dashboard');
    })->name('admin.dashboard');

    Route::get('/dashboards/user', function () {
        $user = Auth::user();
        if ($user->user_type !== 'user') {
            abort(403, 'Unauthorized');
        }
        return view('user.dashboard');
    })->name('user.dashboard');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Email Upload Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/upload', [EmailController::class, 'showUploadForm'])->name('upload.form');
    Route::post('/upload', [EmailController::class, 'upload'])->name('upload');
});

// Financial Analysis Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/financialanalyst', [FinancialAnalysisController::class, 'index'])->name('financialanalyst');
    Route::post('/financialanalyst', [FinancialAnalysisController::class, 'analyse'])->name('analyse');
});

// Admin Routes
Route::middleware(['auth','admin'])->group(function () {
    // User management routes
    Route::get('/calender', [UserController::class, 'new_user'])->name('admin.calender');
    Route::get('/admin/newusers', [UserController::class, 'new_user'])->name('admin.newusers');
    Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::get('/admin/editusers/{id}', [UserController::class, 'edit'])->name('admin.editusers');
    Route::get('/admin/edituser/{id}', [UserController::class, 'update'])->name('admin.users.update');
    Route::get('/admin/deleteuser/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/admin/users/reset-password/{id}', [UserController::class, 'resetPassword'])->name('admin.users.reset-password');
    Route::get('/admin/users/{id}/deactivate', [UserController::class, 'deactivate'])->name('admin.users.deactivate');
    Route::get('/admin/users/{id}/activate', [UserController::class, 'activate'])->name('admin.users.activate');

    // Healthcare module
    Route::get('/healthcare', [HealthcareController::class, 'index'])->name('healthcare');
    Route::post('/healthcare/chat', [HealthcareController::class, 'chat']);
        
    // Viewing logs
    // Route::get('/admin/logs', [AdminController::class, 'viewLogs'])->name('admin.logs');
});




require __DIR__.'/auth.php';
