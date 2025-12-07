<?php

namespace App\Services;

use App\Models\OrderItem;
use Carbon\Carbon;

class OrderItemService
{
    public function getMostPopularProducts(int $limit = 5, int $days = 7)
    {
        $startDate = Carbon::now('Asia/Jakarta')
            ->subDays($days)
            ->startOfDay();

        $endDate = Carbon::now('Asia/Jakarta')
            ->endOfDay();

        $items = OrderItem::query()
                    ->select('product_id')
                    ->selectRaw('COALESCE(custom_name, "Custom") as custom_name')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->with('product')
                    ->whereHas('order', function ($query) use ($startDate, $endDate) {
                        $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->groupBy('product_id', 'custom_name')
                    ->get();

        $results = [];
        $customTotalOrders = 0;
        $customTotalQuantity = 0;

        foreach ($items as $item) {
            if (is_null($item->product_id)) {
                $customTotalOrders += $item->total_orders;
                $customTotalQuantity += $item->total_quantity;
            } else {
                $results[] = [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name ?? 'Unknown',
                    'total_orders' => $item->total_orders,
                    'total_quantity' => $item->total_quantity,
                    'is_custom' => false,
                ];
            }
        }

        if ($customTotalQuantity > 0) {
            $results[] = [
                'product_id' => null,
                'name' => 'Custom Item',
                'total_orders' => $customTotalOrders,
                'total_quantity' => $customTotalQuantity,
                'is_custom' => true,
            ];
        }

        usort($results, function ($a, $b) {
            return $b['total_quantity'] - $a['total_quantity'];
        });

        return collect($results)->take($limit);
    }

    public function getMostPopularProductsByDateRange(string $startDate, string $endDate, int $limit = 5)
    {
        $start = Carbon::parse($startDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $end = Carbon::parse($endDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $items = OrderItem::query()
                    ->select('product_id', 'custom_name')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->with('product')
                    ->whereHas('order', function ($query) use ($start, $end) {
                        $query->whereBetween('schedule', [$start, $end]);
                    })
                    ->groupBy('product_id', 'custom_name')
                    ->get();

        $results = [];
        $customTotalOrders = 0;
        $customTotalQuantity = 0;

        foreach ($items as $item) {
            if (is_null($item->product_id)) {
                $customTotalOrders += $item->total_orders;
                $customTotalQuantity += $item->total_quantity;
            } else {
                $results[] = [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name ?? 'Unknown',
                    'total_orders' => $item->total_orders,
                    'total_quantity' => $item->total_quantity,
                    'is_custom' => false,
                ];
            }
        }

        if ($customTotalQuantity > 0) {
            $results[] = [
                'product_id' => null,
                'name' => 'Custom Item',
                'total_orders' => $customTotalOrders,
                'total_quantity' => $customTotalQuantity,
                'is_custom' => true,
            ];
        }

        usort($results, function ($a, $b) {
            return $b['total_quantity'] - $a['total_quantity'];
        });

        return collect($results)->take($limit);
    }

    public function getMostPopularFixProducts(int $limit = 5)
    {
        return OrderItem::query()
                    ->select('product_id')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->with('product')
                    ->whereNotNull('product_id')
                    ->groupBy('product_id')
                    ->orderByDesc('total_quantity')
                    ->limit($limit)
                    ->get()
                    ->map(function ($item) {
                        return [
                            'product_id' => $item->product_id,
                            'name' => $item->product->name ?? 'Unknown',
                            'total_orders' => $item->total_orders,
                            'total_quantity' => $item->total_quantity,
                            'is_custom' => false,
                        ];
                    });
    }

    public function getMostPopularCustomItems(int $limit = 5)
    {
        return OrderItem::query()
                    ->select('custom_name')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->whereNull('product_id')
                    ->groupBy('custom_name')
                    ->orderByDesc('total_quantity')
                    ->limit($limit)
                    ->get()
                    ->map(function ($item) {
                        return [
                            'product_id' => null,
                            'name' => $item->custom_name,
                            'total_orders' => $item->total_orders,
                            'total_quantity' => $item->total_quantity,
                            'is_custom' => true,
                        ];
                    });
    }

    public function getMostPopularProductsByMonth(object $request, int $limit = 5)
    {
        $month = $request->month ?? Carbon::now('Asia/Jakarta')->month;
        $year = $request->year ?? Carbon::now('Asia/Jakarta')->year;

        $startDate = Carbon::createFromDate($year, $month, 1, 'Asia/Jakarta')->startOfDay();
        $endDate = Carbon::createFromDate($year, $month, 1, 'Asia/Jakarta')->endOfMonth()->endOfDay();

        $items = OrderItem::query()
                    ->select('product_id')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->with('product')
                    ->whereHas('order', function ($query) use ($startDate, $endDate) {
                        $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->groupBy('product_id')
                    ->get();

        $results = [];
        $customTotalOrders = 0;
        $customTotalQuantity = 0;

        foreach ($items as $item) {
            if (is_null($item->product_id)) {
                $customTotalOrders += $item->total_orders;
                $customTotalQuantity += $item->total_quantity;
            } else {
                $results[] = [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name ?? 'Unknown',
                    'total_orders' => $item->total_orders,
                    'total_quantity' => $item->total_quantity,
                    'is_custom' => false,
                ];
            }
        }

        if ($customTotalQuantity > 0) {
            $results[] = [
                'product_id' => null,
                'name' => 'Custom Item',
                'total_orders' => $customTotalOrders,
                'total_quantity' => $customTotalQuantity,
                'is_custom' => true,
            ];
        }

        usort($results, function ($a, $b) {
            return $b['total_quantity'] - $a['total_quantity'];
        });

        return collect($results)->take($limit);
    }

    public function getLowestProductsByMonth(object $request, int $limit = 5)
    {
        $month = $request->month ?? Carbon::now('Asia/Jakarta')->month;
        $year = $request->year ?? Carbon::now('Asia/Jakarta')->year;

        $startDate = Carbon::createFromDate($year, $month, 1, 'Asia/Jakarta')->startOfDay();
        $endDate = Carbon::createFromDate($year, $month, 1, 'Asia/Jakarta')->endOfMonth()->endOfDay();

        $items = OrderItem::query()
                    ->select('product_id')
                    ->selectRaw('COUNT(*) as total_orders')
                    ->selectRaw('SUM(quantity) as total_quantity')
                    ->with('product')
                    ->whereHas('order', function ($query) use ($startDate, $endDate) {
                        $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->groupBy('product_id')
                    ->get();

        $results = [];
        $customTotalOrders = 0;
        $customTotalQuantity = 0;

        foreach ($items as $item) {
            if (is_null($item->product_id)) {
                $customTotalOrders += $item->total_orders;
                $customTotalQuantity += $item->total_quantity;
            } else {
                $results[] = [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name ?? 'Unknown',
                    'total_orders' => $item->total_orders,
                    'total_quantity' => $item->total_quantity,
                    'is_custom' => false,
                ];
            }
        }

        if ($customTotalQuantity > 0) {
            $results[] = [
                'product_id' => null,
                'name' => 'Custom Item',
                'total_orders' => $customTotalOrders,
                'total_quantity' => $customTotalQuantity,
                'is_custom' => true,
            ];
        }

        usort($results, function ($a, $b) {
            return $a['total_quantity'] - $b['total_quantity'];
        });

        return collect($results)->take($limit);
    }
}
