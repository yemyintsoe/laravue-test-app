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
        if(!auth()->check() && request()->path() == 'admin/login') {
            return view('welcome');
        }
        if(auth()->check() && request()->path() == 'admin/login') {
            return redirect('admin/dashboard');
        }
        return $this->checkPermission();
    }

    protected function checkPermission()
    {
        $hasPermission = false;
        if(auth()->check() && auth()->user()->role->permissions != null) {
            $permissions = json_decode(auth()->user()->role->permissions);           
            foreach($permissions as $permission) {
                if('admin/'.$permission->name == request()->path()) {
                    if($permission->read) {
                        $hasPermission = true;
                    }
                }
            }
        }
        if($hasPermission) return view('welcome');
        return view('404');
    }
}
