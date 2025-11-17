<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string("customer_name", 55);
            $table->string("whatsapp_number", 13);
            $table->text("address");
            $table->integer("budget");
            $table->enum("status", ["finished", "unfinished", "canceled"]);
            $table->boolean("is_paid");
            $table->enum("shipping_method", ["delivery", "pickup"]);
            $table->date("schedule");
            $table->text("notes")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
