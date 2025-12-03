<?php

namespace App\Services;

use App\Models\CashTransaction;
use Carbon\Carbon;

class CashTransactionService
{
    public function create(array $data)
    {
        $transactionDate = Carbon::parse($data['transaction_date'])
                ->setTimezone('Asia/Jakarta')
                ->format('Y-m-d H:i:s');

        return CashTransaction::create([...$data, 'transaction_date' => $transactionDate]);
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