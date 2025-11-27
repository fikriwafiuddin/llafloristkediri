
@extends('layout.user-layout') 

@section('content')
<div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Hubungi Kami</h1>
        <p class="text-gray-500">Kami siap membantu mewujudkan momen spesialmu</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        <div class="bg-white p-8 rounded-xl shadow-sm border border-pink-100">
            <h2 class="text-xl font-semibold text-pink-600 mb-6">Informasi Toko</h2>
            
            <div class="space-y-6">
                <div class="flex items-start gap-4">
                    <div class="bg-pink-100 p-3 rounded-full text-pink-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-700">Alamat 
                        <p class="text-gray-600 text-sm mt-1">
                            Jl. Selomangleng, 
                            Kecamatan Mojoroto, Kediri<br>
                            Jawa Timur, Indonesia
                        </p>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="bg-green-100 p-3 rounded-full text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-700">WhatsApp / Telepon</h3>
                        <p class="text-gray-600 text-sm mt-1">+62 812-3456-7890</p>
                        <a href="https://wa.me/6281234567890" target="_blank" class="text-pink-500 text-sm font-semibold hover:underline mt-1 block">
                            Chat Admin Sekarang &rarr;
                        </a>
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="bg-blue-100 p-3 rounded-full text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-700">Jam Operasional</h3>
                        <p class="text-gray-600 text-sm mt-1">
                            Senin - Sabtu: 08.00 - 20.00 WIB<br>
                            Minggu: 08.00-12.00 WIB
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan</h2>
            <form action="#" method="POST"> 
                @csrf
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap</label>
                        <input type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Nama Anda">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="email@contoh.com">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Pesan</label>
                        <textarea class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 h-32" placeholder="Tulis pertanyaan atau pesanan Anda..."></textarea>
                    </div>
                    <button type="button" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition duration-300">
                        Kirim Pesan
                    </button>
                </div>
            </form>
        </div>

    </div>
</div>
@endsection