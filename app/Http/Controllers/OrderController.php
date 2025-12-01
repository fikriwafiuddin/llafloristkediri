<?php

namespace App\Http\Controllers;

use App\Http\Requests\Orders\OrderRequestCreate;
use App\Http\Requests\Orders\OrderRequestUpdate;
use App\Http\Requests\Orders\OrderRequestUpdateStatus;
use App\Models\Order;
use App\services\CategoryService;
use App\Services\OrderService;
use App\Services\ProductService;
use Barryvdh\DomPDF\Facade\Pdf;
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
    public function index(Request $request)
    {
        $orders = $this->orderService->getAll($request);

        return Inertia::render('admin/orders/index/page', [
            'orders' => $orders,
            'filters' => $request->only(['customer_name', 'whatsapp', 'year', 'month', 'status', 'payment', 'shipping_method'])
        ]);
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

        return to_route('orders.show', ['order' => $order->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $order = $this->orderService->getById($id);

        return Inertia::render('admin/orders/show/page', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $order = $this->orderService->getById($id);

        return Inertia::render('admin/orders/update/page', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequestUpdate $request, int $id)
    {
        $this->orderService->update($request->validated(), $id);

        return to_route('orders.index')->with('success', 'Data pesanan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->orderService->delete($id);

        return to_route('orders.index')->with('success', 'Data pesanan berhasil dihapus.');
    }

    public function pos(Request $request)
    {
        $products = $this->produceService->getAll($request, 12);
        $categories = $this->categoryService->getAll();

        return Inertia::render('admin/pos/page', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search, category'])
        ]);
    }

    public function updateStatus(OrderRequestUpdateStatus $request, int $id)
    {
        $this->orderService->updateStatus($request->validated(), $id);
    }

    public function streamPdf(int $id)
    {
        $order = $this->orderService->getById($id);

        return view('order_pdf', ['order' => $order]);
    }
}
