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
        if(auth()->check() && request()->path() == 'admin/login') {
            return redirect('admin/tags');
        }
        return $this->checkPermission(auth()->user());
        // return view('welcome');
    }

    protected function checkPermission($user)
    {
        $permissions = json_decode($user->role->permissions);
        return $permissions;
    }
}
