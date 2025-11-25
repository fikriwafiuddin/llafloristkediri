<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\OrderItem;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = ["category_id", "name", "price", "description", "image"];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
