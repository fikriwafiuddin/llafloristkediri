<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use App\Services\TestimonyService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    private $productService;
    private $testimonyService;

    public function __construct(ProductService $productService, TestimonyService $testimonyService) {
        $this->productService = $productService;
        $this->testimonyService = $testimonyService;
    }

    public function index(): View
    {
        $products = $this->productService->getSome(4);
        $testimonials = $this->testimonyService->getSome(4);

        return view('user.home', [
            'products' => $products,
            'testimonials' => $testimonials
        ]);
    }

    public function testimonials()
    {
        $testimonials = $this->testimonyService->getAll();

        return view('user.testimoni', [
            'testimonials' => $testimonials
        ]);
    }
}
