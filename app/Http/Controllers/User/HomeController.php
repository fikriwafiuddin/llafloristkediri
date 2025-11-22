<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    private $productService;

    public function __construct(ProductService $productService) {
        $this->productService = $productService;
    }

    public function index(): View
    {
        $products = $this->productService->getSome(4);

        return view('user.home', [
            'products' => $products
        ]);
    }
}
