<?php

namespace App\Http\Controllers;

use App\Http\Requests\Testimonials\TestimonyRequest;
use App\Models\Testimonials;
use App\Services\TestimonyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialsController extends Controller
{
    private $testimonyService;

    public function __construct(TestimonyService $testimonyService) {
        $this->testimonyService = $testimonyService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = $this->testimonyService->getAll();

        return Inertia::render('admin/testimonials/index/page', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/testimonials/create/page');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TestimonyRequest $request)
    {
        $this->testimonyService->create($request->validated());

        return to_route('testimonials.index')->with('success', 'Testimoni berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonials $testimonials)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $testimony = $this->testimonyService->getById($id);

        return Inertia::render('admin/testimonials/update/page', [
            'testimony' => $testimony
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TestimonyRequest $request, int $id)
    {
        $this->testimonyService->update($request->validated(), $id);

        return to_route('testimonials.index')->with('success', 'Testimoni berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->testimonyService->destroy($id);

        return to_route('testimonials.index')->with('success', 'Testimoni berhasil dihapus');
    }
}
