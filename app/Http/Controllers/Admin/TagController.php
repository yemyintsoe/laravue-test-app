<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{

    public function index()
    {
        $tags = Tag::latest()->get();
        return response()->json(['tags' => $tags]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:tags,name'
        ]);
        $tag =  Tag::create([
            'name' => $request->name
        ]);
        return response()->json($tag);
    }

    public function show($id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json($tag);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:tags,name,'.$id
        ]);
        $tag = Tag::findOrFail($id);
        $tag->update([
            'name' => $request->name
        ]);
        return response()->json(['msg' => 'a tag updated successfully']);
    }

    public function destroy($id)
    {
        Tag::findOrFail($id)->delete();
        return response()->json(["msg" => "deleted success"]);
    }
}
