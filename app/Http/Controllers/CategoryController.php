<?php

namespace App\Http\Controllers;

use App\Http\Requests\categories\CategoryRequest;
use App\Models\Category;
use App\services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->categoryService->getAll();

        return Inertia::render('admin/categories/index/page', [
            "categories" => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create/page');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $this->categoryService->create($request->validated());
        
        return to_route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $category = $this->categoryService->selectById($id);

        return Inertia::render('admin/categories/update/page', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, int $id)
    {
        $this->categoryService->update($request->validated(), $id);

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->categoryService->destroy($id);

        return to_route('categories.index');
    }
}
