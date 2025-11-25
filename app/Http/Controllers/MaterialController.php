<?php

namespace App\Http\Controllers;

use App\Http\Requests\Materials\MaterialRequest;
use App\Models\Material;
use App\Services\MaterialService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    private $materialService;

    public function __construct(MaterialService $materialService) {
        $this->materialService = $materialService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $materials = $this->materialService->getAll($request);

        return Inertia::render('admin/materials/index/page', [
            'materials' => $materials,
            "filters" => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/materials/create/page');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MaterialRequest $request)
    {
        $this->materialService->create($request->validated());

        return to_route('materials.index')->with('success', 'Bahan berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $material = $this->materialService->getById($id);

        return Inertia::render('admin/materials/update/page', [
            'material' => $material
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MaterialRequest $request, int $id)
    {
        $this->materialService->update($request->validated(), $id);

        return to_route('materials.index')->with('success', 'Bahan berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->materialService->delete($id);

        return to_route('materials.index')->with('success', 'Bahan berhasil dihapus');
    }
}
