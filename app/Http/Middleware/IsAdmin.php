<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if($request->path() == 'api/users/sign-in') {
            return $next($request);
        }
        if(!auth()->check()) {
            return response()->json(['msg' => 'unauthenticated']);
        }
        return $next($request);
    }
}
