<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function create(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $this->uploadImage($data['image']);
        }

        return Product::create($data);
    }

    public function update(array $data, int $id)
    {
        $product = Product::findOrFail($id);

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if (!empty($product->image)) {
                $this->deleteImage($product->image);
            }
            $data['image'] = $this->uploadImage($data['image']);
        } else {
            $data['image'] = $product->image;
        }

        return $product->update($data);
    }

    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);

        if (!empty($product->image)) {
            $this->deleteImage($product->image);
        }

        return $product->delete();
    }

    public function getById(int $id)
    {
        $product = Product::select(['id', 'name', 'price', 'image', 'category_id', 'description'])->with(['category'])->findOrFail($id);

        return $product;
    }

    public function getAll(object $request)
    {
        return Product::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->when($request->category !== 'all', function ($query) use ($request) {
                    if (!empty($request->category)) {
                        $query->where('category_id', (int) $request->category);
                    }
                })
                ->with('category')
                ->paginate(10)
                ->withQueryString();;
    }

    private function uploadImage(UploadedFile $image)
    {
        return $image->store('products', 'public');
    }

    private function deleteImage(string $imagePath)
    {
        $relativePath = 'products/' . basename($imagePath);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }
}