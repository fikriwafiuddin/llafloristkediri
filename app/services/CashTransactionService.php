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

    public function getAll()
    {
        $cashTransactions = CashTransaction::query()->paginate(10);

        return $cashTransactions;
    }

    public function getById(int $id)
    {
        $cashTransaction = CashTransaction::findOrFail($id);

        return $cashTransaction;
    }
}