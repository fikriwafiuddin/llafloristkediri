<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;

class Order extends Model
{
    protected $fillable = [
        "customer_name",
        "whatsapp_number",
        "address",
        "status",
        "is_paid",
        "shipping_method",
        "schedule",
        "total_amount",
        "notes"
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
