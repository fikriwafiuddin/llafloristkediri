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

    public function getBalance(): int
    {
        $income = CashTransaction::query()
                    ->where('type', 'income')
                    ->sum('amount');

        $expense = CashTransaction::query()
                    ->where('type', 'expense')
                    ->sum('amount');

        return $income - $expense;
    }

    public function getBalanceByDateRange(string $startDate, string $endDate): int
    {
        $start = Carbon::parse($startDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $end = Carbon::parse($endDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $income = CashTransaction::query()
                    ->whereBetween('transaction_date', [$start, $end])
                    ->where('type', 'income')
                    ->sum('amount');

        $expense = CashTransaction::query()
                    ->whereBetween('transaction_date', [$start, $end])
                    ->where('type', 'expense')
                    ->sum('amount');

        return $income - $expense;
    }

    public function getFinancialSummary(?string $date = null): array
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

        $income = CashTransaction::query()
                    ->whereDate('transaction_date', $parsedDate)
                    ->where('type', 'income')
                    ->sum('amount');

        $expense = CashTransaction::query()
                    ->whereDate('transaction_date', $parsedDate)
                    ->where('type', 'expense')
                    ->sum('amount');

        $balance = $income - $expense;

        return [
            'income' => $income,
            'expense' => $expense,
            'balance' => $balance,
        ];
    }

    public function getFinancialSummaryByDateRange(string $startDate, string $endDate): array
    {
        $start = Carbon::parse($startDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $end = Carbon::parse($endDate)
            ->setTimezone('Asia/Jakarta')
            ->toDateString();

        $income = CashTransaction::query()
                    ->whereBetween('transaction_date', [$start, $end])
                    ->where('type', 'income')
                    ->sum('amount');

        $expense = CashTransaction::query()
                    ->whereBetween('transaction_date', [$start, $end])
                    ->where('type', 'expense')
                    ->sum('amount');

        $balance = $income - $expense;

        return [
            'income' => $income,
            'expense' => $expense,
            'balance' => $balance,
        ];
    }

    public function getLatestTransactions(int $limit = 5)
    {
        return CashTransaction::query()
                    ->select('id', 'type', 'amount', 'transaction_date')
                    ->latest('transaction_date')
                    ->limit($limit)
                    ->get()
                    ->toArray();
    }

    public function getTransactionChartData(int $days = 7): array
    {
        $startDate = Carbon::now('Asia/Jakarta')
                ->subDays($days - 1)
                ->startOfDay();

        $endDate = Carbon::now('Asia/Jakarta')->endOfDay();

        $transactions = CashTransaction::query()
                    ->whereBetween('transaction_date', [$startDate, $endDate])
                    ->selectRaw("DATE(CONVERT_TZ(transaction_date, '+00:00', '+07:00')) as date")
                    ->selectRaw("DAYNAME(transaction_date) as day")
                    ->selectRaw("SUM(IF(type = 'income', amount, 0)) as income")
                    ->selectRaw("SUM(IF(type = 'expense', amount, 0)) as expense")
                    ->groupBy('date', 'day')
                    ->orderBy('date')
                    ->get();

        $dayNames = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::now('Asia/Jakarta')->subDays($i);
            $dayNames[$date->toDateString()] = $date->translatedFormat('l'); // Hari dalam Bahasa Indonesia
        }

        $result = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::now('Asia/Jakarta')
                ->subDays($i)
                ->toDateString();
            
            $found = false;
            foreach ($transactions as $transaction) {
                if ($transaction['date'] === $date) {
                    $result[] = [
                        'day' => $dayNames[$date] ?? Carbon::parse($date)->translatedFormat('l'),
                        'income' => (int)$transaction['income'],
                        'expense' => (int)$transaction['expense'],
                    ];
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $result[] = [
                    'day' => $dayNames[$date] ?? Carbon::parse($date)->translatedFormat('l'),
                    'income' => 0,
                    'expense' => 0,
                ];
            }
        }

        return $result;
    }
}