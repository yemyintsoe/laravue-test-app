<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{AdminController, CategoryController, TagController, UserController};

# tag
Route::apiResource('/api/tags', TagController::class);
# category
Route::apiResource('/api/categories', CategoryController::class);
# user
Route::apiResource('/api/users', UserController::class);
Route::post('/api/users/sign-in', [UserController::class, 'singIn']);
Route::get('/api/sign-out', [UserController::class, 'singOut']);

Route::get('/', [AdminController::class, 'index']);
Route::get('/{any}', [AdminController::class, 'index'])->where("any",".*");

