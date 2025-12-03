<?php

namespace App\Services;

use App\Models\CashTransaction;

class CashTransactionService
{
    public function getAll()
    {
        $cashTransactions = CashTransaction::query()->paginate(10);

        return $cashTransactions;
    }
}