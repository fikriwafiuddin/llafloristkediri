<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'category_id' => 4,
                'name' => 'Papan Bunga Ucapan Selamat',
                'price' => 550000,
                'description' => 'Papan bunga warna cerah dengan tulisan selamat.',
                'image' => 'products\/wRzGcTu2gVWWnasMnYxFdQtaYmQuRRHRNQKDmNEf.jpg'
            ],
            [
                'category_id' => 3,
                'name' => 'Buket Campuran Pastel',
                'price' => 270000,
                'description' => 'Campuran bunga warna pastel seperti pink, peach, dan putih yang menghadirkan kesan lembut.',
                'image' => 'products\/2PQzs0sV7iet8Yp7VyuRd9M5OBXDNcVbCytkX7CR.jpg'
            ],
            [
                'category_id' => 6,
                'name' => 'Bunga Meja Lily Putih',
                'price' => 280000,
                'description' => 'Arragement bunga lily putih dalam vas kaca modern, cocok untuk dekorasi ruangan.',
                'image' => 'products\/4ikv9Egb9S1uOq0VMaQehGJK4zyKk9eWB7Vm2lOU.jpg'
            ],
            [
                'category_id' => 3,
                'name' => 'Bouquet Tulip Putih Elegant',
                'price' => 320000,
                'description' => 'Bouquet berisi 10 tulip putih impor dengan tampilan sederhana dan mewah.',
                'image' => 'products\/zSF54wH3Nb9wmDCxGGyNfMpSHDyuRg4SVVIvTlIh.webp'
            ],
            [
                'category_id' => 3,
                'name' => 'Bouquet Mawar Merah Premium',
                'price' => 350000,
                'description' => 'Bouquet elegan berisi 12 mawar merah premium yang dibungkus dengan kertas coklat klasik dan pita satin.',
                'image' => 'products\/ISo0jilcHdM8rPlTMJpg7EAccjyyAOPsOWarnsM3.webp'
            ]
        ];

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'category_id' => $product['category_id'],
                'price' => $product['price'],
                'description' => $product['description'],
                'image' => $product['image']
            ]);
        }
    }
}
