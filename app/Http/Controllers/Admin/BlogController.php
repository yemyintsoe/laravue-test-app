<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    use ImageTrait;

    public function index()
    {
        $blogs = Blog::with('user')->latest()->get();
        return response()->json(['blogs' => $blogs]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'post' => 'required',
            'post_excerpt' => 'required',
            'meta_description' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg',
        ]);
        $imageName = $this->uploadImage('image', 'blog-images');

        $data['slug'] = $request->title;
        $data['image'] = $imageName;
        $data['user_id'] = auth()->user()->id;
        $data['view'] = 0;

        $blog =  Blog::create($data);
        return response()->json($blog);
    }

    public function show($id)
    {
        $blog = Blog::find($id);
        return response()->json(['blog' => $blog]);
    }

    public function update(Request $request, $id)
    {
        return $id;
    }

    public function destroy($id)
    {
        $this->deleteImage(Blog::class, $id, 'blog-images');
        return response()->json(['msg' => 'blog has been deleted successfully']);
    }
}
