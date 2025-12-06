<?php

namespace App\Exports;

use App\Models\Order;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OrdersExport implements FromCollection, WithHeadings, WithMapping
{
    protected $month;
    protected $year;
    
    public function __construct($month, $year)
    {
        $this->month = $month;
        $this->year  = $year;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $start = Carbon::create($this->year, $this->month, 1)->startOfDay();
        $end   = Carbon::create($this->year, $this->month, 1)->endOfMonth()->endOfDay();

        return Order::whereBetween('created_at', [$start, $end])
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama Pelanggan',
            'Nomor WhatsApp',
            'Alamat',
            'Status',
            'Pembayaran',
            'Metode Pengiriman',
            'Jadwal',
            'Jumlah Total',
            'Catatan',
            'Dibuat',
        ];
    }

    public function map($order): array
    {
        return [
            $order->id,
            $order->customer_name,
            $order->whatsapp_number,
            $order->address,
            $order->status,
            $order->is_paid ? 'Lunas' : 'Belum lunas',
            $order->shipping_method,
            $order->schedule,
            $order->total_amount,
            $order->notes,
            $order->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
