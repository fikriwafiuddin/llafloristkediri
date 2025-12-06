<?php

namespace App\Http\Controllers;

use App\Services\OrderItemService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    private $orderItemService;
    private $orderService;

    public function __construct(OrderItemService $orderItemService, OrderService $orderService) {
        $this->orderItemService = $orderItemService;
        $this->orderService = $orderService;
    }

    public function index()
    {
        return Inertia::render('admin/reports/index/page');
    }

    public function product(Request $request)
    {
        $topProducts = $this->orderItemService->getMostPopularProductsByMonth($request);
        $lowestProducts = $this->orderItemService->getLowestProductsByMonth($request);

        return Inertia::render('admin/reports/product/page', [
            'topProducts' => $topProducts,
            'lowestProducts' => $lowestProducts,
            'filters' => $request->only(['year', 'month'])
        ]);
    }

    public function order(Request $request)
    {
        $summary = $this->orderService->getMonthlyOrderSummary($request);
        $orderChart = $this->orderService->getMonthlyOrderChart($request);
        $shippingMethodChart = $this->orderService->getShippingMethodStats($request);
        $paymentStatusChart = $this->orderService->getPaymentStatusStats($request);

        return Inertia::render('admin/reports/order/page', [
            'summary' => $summary,
            'orderChart' => $orderChart,
            'shippingMethodChart' => $shippingMethodChart,
            'paymentStatusChart' => $paymentStatusChart,
            'filters' => $request->only(['year', 'month'])
        ]);
    }
}
