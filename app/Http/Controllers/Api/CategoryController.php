<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::latest()->get();
        return response()->json(['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name',
            'image' => 'required|image|mimes:jpg,png,jpeg',
        ]);
        $imageName =  uniqid().'_'.$request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('public/images', $imageName);
        $category =  Category::create([
            'name' => $request->name,
            'image' => $imageName
        ]);
        return response()->json($category);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|unique:categories,name,'.$id,
            'image' => 'nullable|image|mimes:jpg,png,jpeg'
        ]);
        if($request->image != null) {
            Storage::delete('public/images/'.$category->image);
            $imageName = uniqid().'_'.$request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('public/images', $imageName);
        }
        $category->update($data);
        return response()->json(['msg' => 'a category updated successfully']);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        Storage::delete('public/images/'.$category->image);
        $category->delete();
        return response()->json(["msg" => "deleted success"]);
    }
}
