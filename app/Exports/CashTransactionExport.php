<?php

namespace App\Exports;

use App\Models\CashTransaction;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CashTransactionExport implements FromCollection, WithHeadings, WithMapping
{
    protected int $year;
    protected int $month;

    public function __construct(int $year, int $month)
    {
        $this->year  = $year;
        $this->month = $month;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return CashTransaction::whereYear('transaction_date', $this->year)
            ->whereMonth('transaction_date', $this->month)
            ->orderBy('transaction_date', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'Tanggal Transaksi',
            'Jenis',
            'Kategori',
            'Nominal',
            'Deskripsi',
        ];
    }

    public function map($row): array
    {
        return [
            Carbon::parse($row->transaction_date)->translatedFormat('d F Y H:i'),
            $row->type === 'income' ? 'Pemasukan' : 'Pengeluaran',
            ucfirst($row->category),
            number_format($row->amount, 0, ',', '.'),
            $row->description ?? '-',
        ];
    }
}
