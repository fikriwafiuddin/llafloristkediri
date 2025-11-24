@extends('layout.user-layout')

@section('title', 'Tetang Kami')

@section('content')
<div class="">
    {{-- Hero Section --}}
    <section 
        class="relative bg-gradient-to-br from-pink-100 via-white to-green-100 py-20"
        data-testid="about-hero-section"
    >
        <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
            <div class="flex justify-center mb-6">
            <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
            </div>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-6" data-testid="about-title">
            Tentang LLa Florist Kediri
            </h1>
            <p class="text-lg text-muted-foreground">
            Lebih dari sekadar toko bunga, kami adalah bagian dari setiap momen berharga dalam hidup Anda
            </p>
        </div>
        </div>
    </section>

    {{-- Story Section --}}
    <section class="py-16" data-testid="story-section">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
            <h2 class="text-3xl font-bold mb-6">Cerita Kami</h2>
            <div class="space-y-4 text-muted-foreground">
            <p>
                LLa Florist Kediri dimulai dari passion terhadap keindahan bunga dan keinginan untuk membawa kebahagiaan 
                kepada setiap orang melalui rangkaian bunga yang indah dan bermakna.
            </p>
            <p>
                Sejak tahun 2015, kami telah melayani ribuan pelanggan di Kediri dan sekitarnya untuk berbagai 
                acara - mulai dari wisuda, ulang tahun, pernikahan, hingga ungkapan belasungkawa. Setiap rangkaian 
                yang kami buat adalah karya seni yang dirancang khusus dengan detail dan perhatian penuh.
            </p>
            <p>
                Dengan tim florist profesional yang berpengalaman lebih dari 10 tahun, kami berkomitmen untuk 
                terus menghadirkan bunga segar berkualitas tinggi dan pelayanan terbaik untuk setiap pelanggan.
            </p>
            <p>
                Kepercayaan Anda adalah motivasi terbesar kami untuk terus berinovasi dan memberikan yang terbaik. 
                Terima kasih telah menjadi bagian dari perjalanan kami.
            </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <img 
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80" 
            alt="Flower arrangement 1" 
            class="rounded-xl h-64 object-cover"
            />
            <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" 
            alt="Flower arrangement 2" 
            class="rounded-xl h-64 object-cover mt-8"
            />
        </div>
        </div>
    </div>
    </section>
</div>
@endsection