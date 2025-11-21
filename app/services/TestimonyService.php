<?php

namespace App\Services;

use App\Models\Testimonials;

class TestimonyService
{
    public function create(array $data)
    {
        return Testimonials::create($data);
    }

    public function update(array $data, int $id)
    {
        $testimony = Testimonials::findOrFail($id);

        return $testimony->update($data);
    }

    public function destroy(int $id)
    {
        $testimony = Testimonials::findOrFail($id);

        return $testimony->delete();
    }

    public function getAll()
    {
        return Testimonials::query()->paginate(10);
    }

    public function getById(int $id)
    {
        return Testimonials::findOrFail($id);
    }
}