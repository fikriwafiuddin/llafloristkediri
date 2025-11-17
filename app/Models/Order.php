<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ["customer_name", "whatsapp_number", "address", "budget", "status", "is_paid", "shipping_method", "schedule", "notes"];
}
