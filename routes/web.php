<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{CategoryController, TagController};

Route::get('/', function(){
    return view('welcome');
});

# tag
Route::apiResource('/api/tags', TagController::class);
# category
Route::apiResource('/api/categories', CategoryController::class);

Route::get('/{any}', function () {
    return view('welcome');
})->where("any",".*");