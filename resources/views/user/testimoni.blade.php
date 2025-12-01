@extends('layout.user-layout') {{-- Menggunakan layout yang Anda berikan --}}

@section('title', 'Testimoni') {{-- Mengganti judul halaman --}}

@section('content')
    <main class="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <section class="max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-sans font-extrabold mb-4 text-center tracking-tight" style="color: oklch(0.3139 0.0171 346.5128);">
                Apa Kata Pelanggan Kami?
            </h1>
            <p class="text-lg mb-12 text-center" style="color: oklch(0.5901 0.0182 345.9306);">
                Lihat ulasan dan pengalaman mereka yang telah menggunakan layanan llafloristkediri.
            </p>

            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                
                {{-- Testimoni 1 --}}
                <div class="p-6 rounded-xl shadow-lg border" 
                     style="background-color: oklch(0.9894 0.0064 345.3115); border-color: oklch(0.9025 0.0117 345.4804);">
                    <div class="flex items-center mb-4">
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                    </div>
                    <p class="italic mb-4" style="color: oklch(0.3139 0.0171 346.5128);">
                        "Bunga yang saya pesan tiba dengan sangat cepat dan bunganya segar sekali. Layanan pelanggan juga sangat membantu dalam memilih rangkaian yang tepat!"
                    </p>
                    <div class="font-bold" style="color: oklch(0.7215 0.1176 359.0666);">
                        Andi S.
                    </div>
                    <div class="text-sm" style="color: oklch(0.5901 0.0182 345.9306);">
                        Pelanggan Setia
                    </div>
                </div>

                {{-- Testimoni 2 --}}
                <div class="p-6 rounded-xl shadow-lg border"
                     style="background-color: oklch(0.9894 0.0064 345.3115); border-color: oklch(0.9025 0.0117 345.4804);">
                    <div class="flex items-center mb-4">
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl" style="color: oklch(0.7658 0.0966 358.0374);">★</span> {{-- Bintang setengah/kurang --}}
                    </div>
                    <p class="italic mb-4" style="color: oklch(0.3139 0.0171 346.5128);">
                        "Desain karangan bunganya unik dan elegan. Pilihan terbaik untuk hadiah spesial. Hanya saja proses *checkout* sedikit membingungkan."
                    </p>
                    <div class="font-bold" style="color: oklch(0.7215 0.1176 359.0666);">
                        Dewi L.
                    </div>
                    <div class="text-sm" style="color: oklch(0.5901 0.0182 345.9306);">
                        Pembeli Pertama
                    </div>
                </div>

                {{-- Testimoni 3 --}}
                <div class="p-6 rounded-xl shadow-lg border"
                     style="background-color: oklch(0.9894 0.0064 345.3115); border-color: oklch(0.9025 0.0117 345.4804);">
                    <div class="flex items-center mb-4">
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl mr-2" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                        <span class="text-2xl" style="color: oklch(0.7215 0.1176 359.0666);">★</span>
                    </div>
                    <p class="italic mb-4" style="color: oklch(0.3139 0.0171 346.5128);">
                        "Kualitas bunga dan pengirimannya sangat memuaskan. Terima kasih llafloristkediri telah membuat acara saya semakin indah!"
                    </p>
                    <div class="font-bold" style="color: oklch(0.7215 0.1176 359.0666);">
                        Budi H.
                    </div>
                    <div class="text-sm" style="color: oklch(0.5901 0.0182 345.9306);">
                        Event Organizer
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection

@section('script')
    {{-- Anda bisa menambahkan script khusus untuk halaman ini jika diperlukan --}}
@endsection