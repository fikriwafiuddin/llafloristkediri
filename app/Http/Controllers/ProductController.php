<?php

namespace App\Http\Controllers;

use App\Exports\ProductsExport;
use App\Http\Requests\products\ProductRequestCreate;
use App\Http\Requests\products\ProductRequestUpdate;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CategoryService;
use App\Services\ProductService;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    protected $productService;
    protected $categoryService;

    public function __construct(ProductService $productService, CategoryService $categoryService) {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = $this->categoryService->getAll();
        $products = $this->productService->getAll($request);

        return Inertia::render("admin/products/index/page", [
            'products' => $products,
            "categories" => $categories,
            "filters" => $request->only(['search', 'category'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->categoryService->getAll();

        return Inertia::render('admin/products/create/page', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequestCreate $request)
    {
        $this->productService->create($request->validated());

        return to_route('products.index')->with('success', 'Produk berhasil ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $product = $this->productService->getById($id);
        $categories = $this->categoryService->getAll();

        return Inertia::render('admin/products/update/page', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequestUpdate $request, int $id)
    {
        $this->productService->update($request->validated(), $id);

        return to_route('products.index')->with('success', 'Produk berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->productService->destroy($id);

        return to_route('products.index')->with('success', 'Produk berhasil dihapus');
    }

    public function exportExcel()
    {
        return Excel::download(new ProductsExport, 'products.xlsx');
    }
}
