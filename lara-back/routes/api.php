<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('posts', PostController::class);

Route::get('/user', function(Request  $request){
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::delete('logout', 'logout')->middleware('auth:sanctum');
});
