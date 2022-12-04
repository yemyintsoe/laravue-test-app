<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index()
    {
        if(!auth()->check() && request()->path() != 'admin/login') {
            return redirect('admin/login');
        }
        return view('welcome');
    }
}
