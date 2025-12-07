<?php

namespace App\services;

use App\Models\Category;
use App\Models\User;

class CategoryService
{
    public function create(array $data)
    {
        return Category::create($data);
    }

    public function update(array $data, int $id)
    {
        $category = Category::findOrFail($id);

        return $category->update($data);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        return $category->delete();
    }

    public function getAll()
    {
        return Category::all(["id", "name"]);
    }

    public function selectById(int $id)
    {
        return Category::findOrFail($id);
    }
}