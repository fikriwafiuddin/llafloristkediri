<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonials extends Model
{
    protected $fillable = ["customer_name", "review", "rating", 'customer_status'];
}
