<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TestimonialsController;
use App\Http\Controllers\User\AboutController;
use App\Http\Controllers\User\CatalogController;
use App\Http\Controllers\User\ContactController;
use App\Http\Controllers\User\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::middleware(['auth', 'verified'])->prefix("/admin")->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::resource('categories', CategoryController::class);

    Route::resource('products', ProductController::class);

    Route::resource('testimonials', TestimonialsController::class);

    Route::resource('materials', MaterialController::class);

    Route::resource('orders', OrderController::class);
});

Route::name('user.')->group(function() {
    Route::get('/', [HomeController::class, 'index'])->name('home.index');
    Route::get('/catalog/{id}', [CatalogController::class, 'show'])->name('catalog.show');
    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
    Route::get('/about', [AboutController::class, 'index'])->name('about.index');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
    Route::get('/testimoni', function () {
        return view('user.testimonial');
    })->name('testimoni.index');
    
});

require __DIR__.'/settings.php';