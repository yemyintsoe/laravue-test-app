<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
 
    public function index()
    {
        return response()->json(['roles' => Role::all()]);
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        return response()->json(['role' => Role::findOrFail($id)]);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->update([
            'permissions' => $request->permissions
        ]);
        return response()->json(['msg' => 'permissions have been assigned successfully']);
    }

    public function destroy($id)
    {
        //
    }
}
