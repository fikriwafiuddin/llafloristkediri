<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    private $orderService;

    public function __construct(OrderService $orderService) {
        $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->query('date');
        $schedules = $this->orderService->getByDate($date);
        $statistics = $this->orderService->getStatisticsByDate($date);

        return Inertia::render('admin/schedules/index/page', [
            'schedules' => $schedules,
            'statistics' => $statistics,
            'date' => $request->only(['date'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $schedule = $this->orderService->getById($id);
        
        return Inertia::render('admin/schedules/show/page', [
            'schedule' => $schedule
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
