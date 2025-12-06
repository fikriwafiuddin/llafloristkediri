<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ProductsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Product::with('category')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Kategori',
            'Nama',
            'Harga',
            'Deskripsi',
            'Dibuat',
        ];
    }

    public function map($product): array
    {
        return [
            $product->id,
            $product->category->name ?? '-',
            $product->name,
            $product->price,
            $product->description,
            $product->created_at->format('Y-m-d H:i'),
        ];
    }
}
