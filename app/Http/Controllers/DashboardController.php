<?php

namespace App\Http\Controllers;

use App\Services\CashTransactionService;
use App\Services\MaterialService;
use App\Services\OrderItemService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private $orderService;
    private $productService;
    private $cashTransactionService;
    private $orderItemService;
    private $materialService;

    public function __construct(
        OrderService $orderService,
        ProductService $productService,
        CashTransactionService $cashTransactionService,
        OrderItemService $orderItemService,
        MaterialService $materialService
    ) {
        $this->orderService = $orderService;
        $this->productService = $productService;
        $this->cashTransactionService = $cashTransactionService;
        $this->orderItemService = $orderItemService;
        $this->materialService = $materialService;
    }

    public function index()
    {
        $totalSchedules = $this->orderService->getCountByDate('schedule');
        $totalBalance = $this->cashTransactionService->getBalance();
        $totalProducts = $this->productService->getCount();
        $totalLatestOrders = $this->orderService->getCountByDate('created_at');

        $ordersChartData = $this->orderService->getOrdersChartData();
        $latestOrders = $this->orderService->getLatestOrders();

        $transactionChartData = $this->cashTransactionService->getTransactionChartData();
        $latestTransactions = $this->cashTransactionService->getLatestTransactions();

        $topProducts = $this->orderItemService->getMostPopularProducts();

        $outOfStockMaterials = $this->materialService->getOutOfStock();
        
        return Inertia::render('admin/dashboard/page', [
            'statistics' => [
                'totalSchedules' => $totalSchedules,
                'totalBalance' => $totalBalance,
                'totalProducts' => $totalProducts,
                'totalLatestOrders' => $totalLatestOrders,
            ],
            'latestOrders' => $latestOrders,
            'ordersChartData' => $ordersChartData,
            'transactionChartData' => $transactionChartData,
            'latestTransactions' => $latestTransactions,
            'topProducts' => $topProducts,
            'outOfStockMaterials' => $outOfStockMaterials
        ]);
    }
}
