<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class CashTransaction extends Model
{
    protected $fillable = [
        'order_id',
        'type',
        'category',
        'amount',
        'transaction_date',
        'description'
    ];

    public function order()
    {
        return $this->hasOne(Order::class);
    }
}
