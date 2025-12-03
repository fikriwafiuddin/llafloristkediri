<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Order #{{ $order->id }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
            padding: 20px;
        }
        
        .header {
            border-bottom: 3px solid #be123c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #be123c;
            margin-bottom: 5px;
        }
        
        .company-info {
            font-size: 10px;
            color: #666;
        }
        
        .invoice-title {
            text-align: right;
            margin-top: -40px;
        }
        
        .invoice-title h1 {
            font-size: 28px;
            color: #be123c;
            margin-bottom: 5px;
        }
        
        .invoice-number {
            font-size: 14px;
            color: #666;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            margin-top: 5px;
        }
        
        .status-completed {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .status-processing {
            background-color: #dbeafe;
            color: #b3294b;
        }
        
        .info-section {
            display: table;
            width: 100%;
            margin-bottom: 25px;
        }
        
        .info-column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding-right: 20px;
        }
        
        .info-box {
            background-color: #fff1f2;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 15px;
        }
        
        .info-box h3 {
            font-size: 13px;
            color: #be123c;
            margin-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
        }
        
        .info-row {
            margin-bottom: 6px;
        }
        
        .info-label {
            color: #6b7280;
            display: inline-block;
            width: 40%;
        }
        
        .info-value {
            font-weight: 500;
            display: inline-block;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .items-table thead {
            background-color: #be123c;
            color: white;
        }
        
        .items-table th {
            padding: 12px 8px;
            text-align: left;
            font-size: 11px;
            font-weight: 600;
        }
        
        .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .items-table tbody tr:hover {
            background-color: #f9fafb;
        }
        
        .item-name {
            font-weight: 600;
            margin-bottom: 3px;
        }
        
        .item-description {
            font-size: 10px;
            color: #6b7280;
            line-height: 1.4;
        }
        
        .item-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
            margin-left: 5px;
        }
        
        .badge-custom {
            background-color: #e9d5ff;
            color: #6b21a8;
        }
        
        .badge-product {
            background-color: #dbeafe;
            color: #b3294b;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .summary-box {
            float: right;
            width: 300px;
            background-color: #f9fafb;
            border: 2px solid #be123c;
            border-radius: 6px;
            padding: 15px;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 12px;
        }
        
        .summary-row.total {
            border-top: 2px solid #be123c;
            padding-top: 10px;
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
        }
        
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            clear: both;
        }
        
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="company-name">LlaFlorist Kediri</div>
        <div class="company-info">
            Jl. Selomangleng, Pojok, Kec.Mojoroto Kota Kediri, Jawa Timur 64114<br>
            Email: llaflorist@gmail.com | Telp: 085808933346
        </div>
        
        <div class="invoice-title">
            <h1>INVOICE</h1>
            <div class="invoice-number">#{{ $order->id }}</div>
            <span class="status-badge status-{{ $order->status }}">
                @if($order->status === 'completed') Selesai
                @elseif($order->status === 'pending') Menunggu
                @elseif($order->status === 'processing') Diproses
                @else {{ ucfirst($order->status) }}
                @endif
            </span>
        </div>
    </div>

    <!-- Order Info Section -->
    <div class="info-section">
        <div class="info-column">
            <div class="info-box">
                <h3>Informasi Umum</h3>
                <div class="info-row">
                    <span class="info-label">ID Pesanan:</span>
                    <span class="info-value">{{ $order->id }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Jadwal:</span>
                    <span class="info-value">{{ \Carbon\Carbon::parse($order->schedule)->format('d M Y, H:i') }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Tanggal Dibuat:</span>
                    <span class="info-value">{{ $order->created_at->format('d M Y, H:i') }}</span>
                </div>
            </div>

            <div class="info-box">
                <h3>Pelanggan</h3>
                <div class="info-row">
                    <span class="info-label">Nama:</span>
                    <span class="info-value">{{ $order->customer_name }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">WhatsApp:</span>
                    <span class="info-value">{{ $order->whatsapp_number }}</span>
                </div>
            </div>
        </div>

        <div class="info-column">
            <div class="info-box">
                <h3>Pengiriman</h3>
                <div class="info-row">
                    <span class="info-label">Alamat:</span>
                    <span class="info-value">{{ $order->address }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Metode:</span>
                    <span class="info-value">
                        {{ $order->shipping_method === 'delivery' ? 'Diantar' : 'Diambil' }}
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Catatan:</span>
                    <span class="info-value">{{ $order->notes ?? '-' }}</span>
                </div>
            </div>

            <div class="info-box">
                <h3>Pembayaran</h3>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span class="info-value">
                        {{ $order->is_paid ? '✓ Lunas' : '✗ Belum Lunas' }}
                    </span>
                </div>
                <div class="info-row">
                    <span class="info-label">Total:</span>
                    <span class="info-value" style="font-size: 14px; color: #b3294b; font-weight: bold;">
                        Rp {{ number_format($order->total_amount, 0, ',', '.') }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Order Items Table -->
    <h3 style="margin-bottom: 15px; color: #eb2525a0; font-size: 14px;">Daftar Pesanan</h3>
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 45%;">Item</th>
                <th style="width: 10%;" class="text-center">Qty</th>
                <th style="width: 20%;" class="text-right">Harga Satuan</th>
                <th style="width: 20%;" class="text-right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->orderItems as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>
                    <div class="item-name">
                        @if($item->is_custom)
                            {{ $item->custom_name }}
                            <span class="item-badge badge-custom">CUSTOM</span>
                        @else
                            {{ $item->product->name }}
                            <span class="item-badge badge-product">PRODUK</span>
                        @endif
                    </div>
                    <div class="item-description">
                        @if($item->is_custom)
                            {{ $item->custom_description }}
                        @else
                            {{ $item->product->description }}
                            @if($item->product->category)
                                <br><em>Kategori: {{ $item->product->category->name }}</em>
                            @endif
                        @endif
                    </div>
                </td>
                <td class="text-center">{{ $item->quantity }}</td>
                <td class="text-right">Rp {{ number_format($item->unit_price, 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Summary -->
    <div class="summary-box">
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>Rp {{ number_format($order->orderItems->sum('subtotal'), 0, ',', '.') }}</span>
        </div>
        <div class="summary-row">
            <span>Total Item:</span>
            <span>{{ $order->orderItems->count() }} items</span>
        </div>
        <div class="summary-row">
            <span>Total Quantity:</span>
            <span>{{ $order->orderItems->sum('quantity') }} pcs</span>
        </div>
        <div class="summary-row total">
            <span>TOTAL:</span>
            <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>Terima kasih atas pesanan Anda!</p>
        <p>Dokumen ini dicetak pada {{ now()->format('d M Y, H:i') }}</p>
    </div>

    <script>
        window.print()
    </script>
</body>
</html>