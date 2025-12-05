<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\CashTransaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function create (array $data)
    {
        return DB::transaction(function () use ($data) {
            $totalAmount = 0;

            $schedule = Carbon::parse($data['schedule'])
                ->setTimezone('Asia/Jakarta')
                ->format('Y-m-d H:i:s');

            $order = Order::create([
                'customer_name'   => $data['customer_name'],
                'whatsapp_number' => $data['whatsapp_number'],
                'address'         => $data['address'],
                'status'          => 'process',
                'is_paid'         => $data['is_paid'],
                'shipping_method' => $data['shipping_method'],
                'schedule'        => $schedule,
                'total_amount'    => 0,
                'notes'           => $data['notes'] ?? null,
            ]);

            foreach ($data['items'] as $item) {
                if (!$item['is_custom']) {
                    $product = Product::findOrFail(
                        $item['product']['id']
                    );

                    $unitPrice = $product->price;
                    $subtotal  = $unitPrice * $item['quantity'];
                } else {
                    $unitPrice = $item['unit_price'];
                    $subtotal  = $unitPrice * $item['quantity'];
                }

                $totalAmount += $subtotal;

                OrderItem::create([
                    'order_id'           => $order->id,
                    'product_id'         => $item['product']['id'] ?? null,
                    'is_custom'          => $item['is_custom'],
                    'custom_name'        => $item['custom_name'],
                    'custom_description' => $item['custom_description'],
                    'quantity'           => $item['quantity'],
                    'unit_price'         => $unitPrice,
                    'subtotal'           => $subtotal,
                ]);
            }

            $order->update([
                'total_amount' => $totalAmount,
            ]);

            if ($data['is_paid']) {
                CashTransaction::create([
                    'order_id' => $order->id,
                    'type' => 'income',
                    'category' => 'Pesanan',
                    'amount' => $totalAmount,
                    'transaction_date' => $schedule,
                    'description' => "Pembayaran pesanan dari {$data['customer_name']}"
                ]);
            }

            return $order;
        });
    }

    public function update(array $data, int $id)
    {
        return DB::transaction(function () use ($data, $id) {
            $order = $this->getById($id);
            
            $schedule = Carbon::parse($data['schedule'])
                    ->setTimezone('Asia/Jakarta')
                    ->format('Y-m-d H:i:s');
            
            $data['schedule'] = $schedule;
            
            $wasPaid = $order->is_paid;
            $isPaid = $data['is_paid'];
            
            $order->update($data);

            if (!$wasPaid && $isPaid) {
                CashTransaction::create([
                    'order_id' => $order->id,
                    'type' => 'income',
                    'category' => 'Pesanan',
                    'amount' => $order->total_amount,
                    'transaction_date' => $schedule,
                    'description' => "Pembayaran pesanan dari {$order->customer_name}"
                ]);
            }
            elseif ($wasPaid && !$isPaid) {
                CashTransaction::where('order_id', $order->id)->delete();
            }

            return $order;
        });
    }

    public function updateStatus (array $data, int $id)
    {
        $order = $this->getById($id);

        return $order->update(['status' => $data['status']]);
    }

    public function delete(int $id)
    {
        $order = $this->getById($id);

        return $order->delete();
    }

    public function getAll(object $request)
    {
        $year = $request->year ?? Carbon::now()->year;
        $month = $request->month ?? Carbon::now()->month;

        if (!is_numeric($year) || $year < 2020 || $year > Carbon::now()->year) {
            $year = Carbon::now()->year;
        }

        if (!is_numeric($month) || $month < 0 || $month > 11) {
            $month = Carbon::now()->month;
        } else {
            $month = intval($month) + 1;
        }

        $orders = Order::query()
                    ->when($request->customer_name, function ($query, $customer_name) {
                        $query->where('customer_name', 'like', "%{$customer_name}%");
                    })
                    ->when($request->whatsapp, function ($query, $whatsapp) {
                        $query->where('whatsapp_number', 'like', "%{$whatsapp}%");
                    })
                    ->whereYear('schedule', $year)
                    ->whereMonth('schedule', $month)
                    ->when($request->status !== 'all', function ($query) use ($request) {
                        if (!empty($request->status)) {
                            $query->where('status', strtolower($request->status));
                        }
                    })
                    ->when($request->payment !== 'all', function ($query) use ($request) {
                        if (!empty($request->payment) && in_array(strtolower($request->payment), ['paid', 'unpaid'])) {
                            $query->where('is_paid', $request->payment === 'paid');
                        }
                    })
                    ->when($request->shipping_method !== 'all', function ($query) use ($request) {
                        if (!empty($request->shipping_method) && in_array(strtolower($request->shipping_method), ['delivery', 'pickup'])) {
                            $query->where('shipping_method', $request->shipping_method);
                        }
                    })
                    ->paginate(10);

        return $orders;
    }

    public function getById (int $id) {
        $order = Order::select()->with(['orderItems.product'])->findOrFail($id);

        return $order;
    }

    public function getByDate(?string $date)
    {
        if (empty($date)) {
            $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
        } else {
            try {
                $parsedDate = Carbon::parse($date)
                    ->setTimezone('Asia/Jakarta')
                    ->toDateString();
            } catch (\Exception $e) {
                $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
            }
        }

        $orders = Order::query()
                    ->whereDate('schedule', $parsedDate)
                    ->with(['orderItems.product'])
                    ->paginate(10);

        return $orders;
    }

    public function getByDateRange(string $startDate, string $endDate)
    {
        $start = Carbon::parse($startDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $end = Carbon::parse($endDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $orders = Order::query()
                    ->whereBetween('schedule', [$start, $end])
                    ->with(['orderItems.product'])
                    ->paginate(10);

        return $orders;
    }

    public function getStatisticsByDate(?string $date): array
    {
        if (empty($date)) {
            $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
        } else {
            try {
                $parsedDate = Carbon::parse($date)
                    ->setTimezone('Asia/Jakarta')
                    ->toDateString();
            } catch (\Exception $e) {
                $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
            }
        }

        $totalSchedules = Order::query()
                            ->whereDate('schedule', $parsedDate)
                            ->count();

        $processCount = Order::query()
                        ->whereDate('schedule', $parsedDate)
                        ->where('status', 'process')
                        ->count();

        $completedCount = Order::query()
                        ->whereDate('schedule', $parsedDate)
                        ->where('status', 'completed')
                        ->count();

        $cancelledCount = Order::query()
                        ->whereDate('schedule', $parsedDate)
                        ->where('status', 'cancelled')
                        ->count();

        return [
            'total' => $totalSchedules,
            'process' => $processCount,
            'completed' => $completedCount,
            'cancelled' => $cancelledCount,
        ];
    }

    public function getCountByDate(string $coll, ?string $date = null): int
    {
        if (empty($date)) {
            $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
        } else {
            try {
                $parsedDate = Carbon::parse($date)
                    ->setTimezone('Asia/Jakarta')
                    ->toDateString();
            } catch (\Exception $e) {
                $parsedDate = Carbon::now('Asia/Jakarta')->toDateString();
            }
        }

        return Order::query()
                    ->whereDate($coll, $parsedDate)
                    ->count();
    }

    public function getCountByDateRange(string $startDate, string $endDate): int
    {
        $start = Carbon::parse($startDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $end = Carbon::parse($endDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        return Order::query()
                    ->whereBetween('schedule', [$start, $end])
                    ->count();
    }

    public function getLatestOrders(int $limit = 5)
    {
        return Order::query()
                    ->select('id', 'customer_name', 'total_amount')
                    ->latest('created_at')
                    ->limit($limit)
                    ->get();
    }

    public function getOrdersChartData(int $days = 7): array
    {
        $startDate = Carbon::now('Asia/Jakarta')
            ->subDays($days - 1)
            ->startOfDay();
        $endDate = Carbon::now('Asia/Jakarta')->endOfDay();

        $orders = Order::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw("DATE(CONVERT_TZ(created_at, '+00:00', '+07:00')) as date")
            ->selectRaw("COUNT(*) as order_count")
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();

        $result = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::now('Asia/Jakarta')
                ->subDays($i)
                ->toDateString();
            
            $found = false;
            foreach ($orders as $order) {
                if ($order['date'] === $date) {
                    $result[] = [
                        'date' => $date,
                        'order' => $order['order_count'],
                    ];
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $result[] = [
                    'date' => $date,
                    'order' => 0,
                ];
            }
        }

        return $result;
    }
}