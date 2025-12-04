<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashTransactions\CashTransactionRequest;
use App\Models\CashTransaction;
use App\Services\CashTransactionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;

class CashTransactionController extends Controller
{
    private $cashTransactionService;

    public function __construct(CashTransactionService $cashTransactionService) {
        $this->cashTransactionService = $cashTransactionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cashTransactions = $this->cashTransactionService->getAll();

        return Inertia::render('admin/cash_transactions/index/page', [
            'cashTransactions' => $cashTransactions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/cash_transactions/create/page');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CashTransactionRequest $request)
    {
        $this->cashTransactionService->create($request->validated());

        return to_route('cash-transactions.index')->with('success', 'Transaksi kas berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(CashTransaction $cashTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $cashTransaction = $this->cashTransactionService->getById($id);

        return Inertia::render('admin/cash_transactions/update/page', [
            'cashTransaction' => $cashTransaction
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CashTransactionRequest $request, int $id)
    {
        try {
            $this->cashTransactionService->update($request->validated(), $id);

            return to_route('cash-transactions.index')->with('success', 'Transaksi kas berhasil diupdate');
        } catch (\Exception $e) {
            return to_route('cash-transactions.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $this->cashTransactionService->delete($id);

            return to_route('cash-transactions.index')->with('success', 'Transaksi kas berhasil dihapus');
        } catch (\Exception $e) {
            return to_route('cash-transactions.index')->with('error', $e->getMessage());
        }
    }
}
