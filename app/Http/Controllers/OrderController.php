<?php

namespace App\Http\Controllers;

use App\Http\Requests\Orders\OrderRequestCreate;
use App\Models\Order;
use App\services\CategoryService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    private $orderService;
    private $produceService;
    private $categoryService;

    public function __construct(OrderService $orderService, ProductService $produceService, CategoryService $categoryService) {
        $this->orderService = $orderService;
        $this->produceService = $produceService;
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/pos/page');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $products = $this->produceService->getAll($request, 12);
        $categories = $this->categoryService->getAll();

        return Inertia::render('admin/pos/page', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search, category'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequestCreate $request)
    {
        $order = $this->orderService->create($request->validated());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
