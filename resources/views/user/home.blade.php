@extends('layout.user-layout')

@section('title', 'Beranda')

@section('content')
    {{-- Hero Section --}}
    <section class="relative bg-[url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80')] bg-no-repeat bg-cover bg-center min-h-[500px] flex items-center">
        <div class="overlay"></div>
        <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-2xl">
                <h1 class="text-center sm:text-left font-playfair-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground bounce-y">Wujudkan Momen Spesial dengan Bunga Indah</h1>
                <p class="text-center sm:text-left text-base sm:text-lg mb-8 text-foreground/80">LLa Florist Kediri hadir untuk setiap momen berharga Anda. Dari wisuda, ulang tahun, hingga pernikahan - kami siap melayani dengan rangkaian bunga segar berkualitas tinggi.</p>
                <div class="flex flex-col justify-center sm:flex-row sm:justify-start gap-2">
                    <a href="">
                        <x-button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            Belanja Sekarang
                        </x-button>
                    </a>
                    <a href="">
                        <x-button variant="success">
                            <svg
                                class="size-7 inline"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                fill="currentColor"
                                stroke="current-color"
                            >
                                <path d="M188.1 318.6C188.1 343.5 195.1 367.8 208.3 388.7L211.4 393.7L198.1 442.3L248 429.2L252.8 432.1C273 444.1 296.2 450.5 319.9 450.5L320 450.5C392.6 450.5 453.3 391.4 453.3 318.7C453.3 283.5 438.1 250.4 413.2 225.5C388.2 200.5 355.2 186.8 320 186.8C247.3 186.8 188.2 245.9 188.1 318.6zM370.8 394C358.2 395.9 348.4 394.9 323.3 384.1C286.5 368.2 261.5 332.6 256.4 325.4C256 324.8 255.7 324.5 255.6 324.3C253.6 321.7 239.4 302.8 239.4 283.3C239.4 264.9 248.4 255.4 252.6 251C252.9 250.7 253.1 250.5 253.3 250.2C256.9 246.2 261.2 245.2 263.9 245.2C266.5 245.2 269.2 245.2 271.5 245.3L272.3 245.3C274.6 245.3 277.5 245.3 280.4 252.1C281.6 255 283.4 259.4 285.3 263.9C288.6 271.9 292 280.2 292.6 281.5C293.6 283.5 294.3 285.8 292.9 288.4C289.5 295.2 286 298.8 283.6 301.4C280.5 304.6 279.1 306.1 281.3 310C296.6 336.3 311.9 345.4 335.2 357.1C339.2 359.1 341.5 358.8 343.8 356.1C346.1 353.5 353.7 344.5 356.3 340.6C358.9 336.6 361.6 337.3 365.2 338.6C368.8 339.9 388.3 349.5 392.3 351.5C393.1 351.9 393.8 352.2 394.4 352.5C397.2 353.9 399.1 354.8 399.9 356.1C400.8 358 400.8 366 397.5 375.2C394.2 384.5 378.4 392.9 370.8 394zM544 160C544 124.7 515.3 96 480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160zM244.1 457.9L160 480L182.5 397.8C168.6 373.8 161.3 346.5 161.3 318.5C161.4 231.1 232.5 160 319.9 160C362.3 160 402.1 176.5 432.1 206.5C462 236.5 480 276.3 480 318.7C480 406.1 407.3 477.2 319.9 477.2C293.3 477.2 267.2 470.5 244.1 457.9z"
                            />
                            </svg>
                            Pesan Custom
                        </x-button>
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- Feature Section --}}
    <section class="relative py-16 px-8 bg-gradient-to-br from-pink-50 to-green-50">
        <div class="grid sm:grid-cols-3 gap-4 justify-center">
            <div class="rounded-xl bg-card text-card-foreground text-center border-0 shadow-sm">
                <div class="p-6 pt-6">
                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-flower2 lucide-flower-2 h-8 w-8 text-primary"
                            aria-hidden="true"
                        >
                            <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1">
                            </path>
                            <circle cx="12" cy="8" r="2"></circle>
                            <path d="M12 10v12"></path>
                            <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"></path>
                            <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 font-playfair-display">
                        Bunga Segar Berkualitas
                    </h3>
                    <p
                        class="text-sm text-muted-foreground"
                    >
                        Kami hanya menggunakan bunga pilihan terbaik untuk setiap rangkaian
                    </p>
                </div>
            </div>

            <div class="rounded-xl bg-card text-card-foreground text-center border-0 shadow-sm">
                <div class="p-6 pt-6">
                    <div
                        class="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-clock h-8 w-8 text-secondary-foreground"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 font-playfair-display">
                        Pengiriman Tepat Waktu
                    </h3>
                    <p
                        class="text-sm text-muted-foreground"
                    >
                        Layanan antar cepat di area Kediri, tersedia untuk pesanan mendadak
                    </p>
                </div>
            </div>

            <div class="rounded-xl bg-card text-card-foreground text-center border-0 shadow-sm">
                <div class="p-6 pt-6">
                    <div class="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-heart h-8 w-8 text-accent-foreground"
                            aria-hidden="true"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 font-playfair-display">
                        Desain Custom
                    </h3>
                    <p
                        class="text-sm text-muted-foreground"
                    >
                        Wujudkan rangkaian bunga impian Anda dengan layanan kustomisasi
                    </p>
                </div>
            </div>
        </div>
    </section>

    {{-- Featured Products Section --}}
    <section class="py-16">
        <div class="container mx-auto px-4 space-y-8">
            <div>
                <h1 class="text-center text-4xl font-playfair-display font-bold">Produk Pilihan</h1>
                <p class="text-center">Rangkaian bunga terpopuler untuk berbagai acara spesial Anda</p>
            </div>

            <div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    @foreach ($products as $product)
                        <x-product-card
                            :id="$product['id']"
                            :image="$product['image']"
                            :name="$product['name']"
                            :description="$product['description']"
                            :category="$product['category']['name']"
                            :price="$product['price']"
                        />
                    @endforeach
                </div>

                <div class="flex justify-center mt-6">
                    <a href="{{ route('user.catalog.index') }}">
                        <x-button variant="outline">
                            Lihat Semua Produk
                        </x-button>
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- Testimonilas Section --}}
    <div class="relative py-16 px-8 bg-gradient-to-br from-pink-50 to-green-50 mb-20">
        <div class="container mx-auto px-4 space-y-8">
            <div>
                <h1 class="text-center text-4xl font-playfair-display font-bold">Ulasan Pemesan</h1>
                <p class="text-center">Beberapa ulasan dari beberapa orang yang telah memesan produk kami</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                @foreach ($testimonials as $testimony)
                    <x-testimony-card
                        :customer_name="$testimony['customer_name']"
                        :rating="$testimony['rating']"
                        :review="$testimony['review']"
                    />
                @endforeach
            </div>
        </div>
    </div>

    {{-- CTAS Section --}}
    <section class="py-16 bg-gradient-to-r from-pink-100 to-green-100" data-testid="cta-section">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold font-playfair-display mb-4">
                Butuh Rangkaian Bunga Spesial?
            </h2>
            <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Tim kami siap membantu mewujudkan rangkaian bunga sesuai keinginan Anda. Hubungi kami untuk konsultasi gratis!
            </p>
            <x-button>Hubungi Kami</x-button>
        </div>
    </section>
@endsection