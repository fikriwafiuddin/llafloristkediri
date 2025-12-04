<?php

namespace App\Services;

use App\Models\CashTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CashTransactionService
{
    public function create(array $data)
    {
        $transactionDate = Carbon::parse($data['transaction_date'])
                ->setTimezone('Asia/Jakarta')
                ->format('Y-m-d H:i:s');

        return CashTransaction::create([...$data, 'transaction_date' => $transactionDate]);
    }

    public function update(array $data, int $id)
    {
        $cashTransaction = $this->getById($id);

        if (!empty($cashTransaction->order_id)) {
            throw new \Exception('Transaksi kas yang terhubung dengan pesanan tidak dapat diupdate.');
        }

        $transactionDate = Carbon::parse($data['transaction_date'])
                ->setTimezone('Asia/Jakarta')
                ->format('Y-m-d H:i:s');
        
        return $cashTransaction->update([...$data, 'transaction_date' => $transactionDate]);
    }

    public function delete(int $id)
    {
        $cashTransaction = $this->getById($id);

        if (!empty($cashTransaction->order_id)) {
            throw new \Exception('Transaksi kas yang terhubung dengan pesanan tidak dapat dihapus.');
        }

        return $cashTransaction->delete();
    }

    public function getAll(object $request)
    {
        $year = $request->year ?? Carbon::now()->year;
        $month = $request->month ?? Carbon::now()->month;

        $cashTransactions = CashTransaction::query()
                                    ->whereYear('transaction_date', $year)
                                    ->whereMonth('transaction_date', $month)
                                    ->when($request->type !== 'all', function ($query) use ($request) {
                                        if (!empty($request->type)) {
                                            $query->where('type', strtolower($request->type));
                                        }
                                    })
                                    ->paginate(10);

        return $cashTransactions;
    }

    public function getById(int $id)
    {
        $cashTransaction = CashTransaction::findOrFail($id);

        return $cashTransaction;
    }
}