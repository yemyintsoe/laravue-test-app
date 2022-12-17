<?php
namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait {
    
    public function uploadImage($fieldname = 'image', $directory = 'images')
    {
        $imageName =  uniqid() .'_'. request()->file($fieldname)->getClientOriginalName();
        request()->file($fieldname)->storeAs("public/$directory", $imageName);
        return $imageName;
    }

    public function updateImage($fieldname = 'image', $directory = 'images', $oldImage)
    {
        request()->validate([
            $fieldname => 'image|mimes:jpg,png,jpeg'
        ]);
        Storage::delete("public/$directory/$oldImage");
        $imageName = uniqid().'_'.request()->file($fieldname)->getClientOriginalName();
        request()->file($fieldname)->storeAs("public/$directory", $imageName);
        return $imageName;
    }

    public function deleteImage($model, $id, $directory)
    {
        $model = $model::findOrFail($id);
        Storage::delete("public/$directory/$model->image");
        $model->delete();
    }
}