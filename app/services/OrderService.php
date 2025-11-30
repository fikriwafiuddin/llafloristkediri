<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
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

            return $order;
        });
    }

    public function update(array $data, int $id)
    {
        $schedule = Carbon::parse($data['schedule'])
                ->setTimezone('Asia/Jakarta')
                ->format('Y-m-d H:i:s');
        
        $data['schedule'] = $schedule;
        
        $order = $this->getById($id);

        return $order->update($data);
    }

    public function getAll()
    {
        $orders = Order::query()->paginate(10);

        return $orders;
    }

    public function getById (int $id) {
        $order = Order::select()->with(['orderItems.product'])->findOrFail($id);

        return $order;
    }
}