<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    protected $fillable = ["category_id", "name", "price", "description", "image"];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
