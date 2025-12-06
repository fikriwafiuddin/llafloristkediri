<?php

namespace App\Http\Controllers;

use App\Services\OrderItemService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    private $orderItemService;

    public function __construct(OrderItemService $orderItemService) {
        $this->orderItemService = $orderItemService;
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
}
