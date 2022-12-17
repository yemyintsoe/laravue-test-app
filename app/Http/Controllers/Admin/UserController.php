<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function index()
    {
        $users = User::with('role')->latest()->get();
        return response()->json(['users' => $users]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required',
        ]);
        $data['password'] = Hash::make($request->password);
        $user = User::create($data);
        return response()->json($user);
    }

    // public function show($id)
    // {
    //     $category = Category::findOrFail($id);
    //     return response()->json($category);
    // }

    // public function update(Request $request, $id)
    // {
    //     $category = Category::findOrFail($id);
    //     $data = $request->validate([
    //         'name' => 'required|unique:categories,name,'.$id
    //     ]);
    //     if($request->image) {
    //         $request->validate([
    //             'image' => 'image|mimes:jpg,png,jpeg'
    //         ]);
    //         Storage::delete('public/images/'.$category->image);
    //         $imageName = uniqid().'_'.$request->file('image')->getClientOriginalName();
    //         $request->file('image')->storeAs('public/images', $imageName);
    //         $data['image'] = $imageName;
    //     }
    //     $category->update($data);
    //     return response()->json(['msg' => 'a category updated successfully']);
    // }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(["msg" => "deleted success"]);
    }

    public function singIn(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            return response()->json(['status' => 'success', 'user' => Auth::user()]);
        }
        return response()->json(['status' => 'fail']);
    }

    public function singOut()
    {
        auth()->logout();
        return redirect('/admin/login');
    }

    public function getAuthUser()
    {
        if(!auth()->check()) {
            return response()->json(['authUser' => null]); 
        }
        $authUserId = auth()->user()->id;
        $authUser = User::with('role')->findOrFail($authUserId);
        return response()->json(['authUser' => $authUser]);
    }
}
