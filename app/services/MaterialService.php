<?php

namespace App\Services;

use App\Models\Material;

class MaterialService
{
    public function create(array $data)
    {
        return Material::create($data);
    }

    public function update(array $data, int $id)
    {
        $material = $this->getById($id);

        return $material->update($data);
    }

    public function delete(int $id)
    {
        $material = $this->getById($id);

        return $material->delete();
    }

    public function getAll(object $request)
    {
        return Material::query()
                    ->when($request->search, function ($query, $search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->paginate(10)
                    ->withQueryString();
    }

    public function getById(int $id)
    {
        return Material::findOrFail($id);
    }
}