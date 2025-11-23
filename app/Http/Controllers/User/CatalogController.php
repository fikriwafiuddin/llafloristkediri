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

    public function show(int $id): View
    {
        $product = $this->productService->getById($id);
        $relatedProducts = $this->productService->getRelatedByCategory($product['category_id'], $product['id']);

        return view('user.detail-product', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
