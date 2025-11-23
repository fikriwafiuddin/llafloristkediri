<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\services\CategoryService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CatalogController extends Controller
{
    private $productService;
    private $categoryService;

    public function __construct(ProductService $productService, CategoryService $categoryService) {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
    }

    public function index(Request $request): View
    {
        $products = $this->productService->getAll($request, 12);
        $categories = $this->categoryService->getAll();

        return view('user.catalog', [
            'products' => $products,
            'categories' => $categories
        ]);
    }
}
