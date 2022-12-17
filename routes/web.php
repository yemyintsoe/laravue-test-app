<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{AdminController, BlogController, CategoryController, RoleController, TagController, UserController};

Route::prefix('api')->middleware('isAdmin')->group(function() {
    # tag
    Route::apiResource('/tags', TagController::class);
    # category
    Route::apiResource('/categories', CategoryController::class);
    # category
    Route::apiResource('/blogs', BlogController::class);
    # role
    Route::apiResource('/roles', RoleController::class);
    # user
    Route::apiResource('/users', UserController::class);
    Route::post('/users/sign-in', [UserController::class, 'singIn']);
    Route::get('/sign-out', [UserController::class, 'singOut']);
    Route::get('/users/auth/user', [UserController::class, 'getAuthUser']);
});

Route::get('/', [AdminController::class, 'index']);
Route::get('/{any}', [AdminController::class, 'index'])->where("any",".*");

