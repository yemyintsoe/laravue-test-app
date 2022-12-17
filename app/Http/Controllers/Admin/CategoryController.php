<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    use ImageTrait;

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
        $imageName = $this->uploadImage('image', 'category-images');
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
            'name' => 'required|unique:categories,name,'.$id
        ]);
        if($request->image) {
            $data['image'] = $this->updateImage('image', 'category-images', $category->image);
        }
        $category->update($data);
        return response()->json(['msg' => 'a category updated successfully']);
    }

    public function destroy($id)
    {
        $this->deleteImage(Category::class, $id, 'category-images');
        return response()->json(["msg" => "deleted success"]);
    }
}
