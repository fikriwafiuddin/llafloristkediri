@extends('layout.user-layout')

@section('title', 'Testimoni')

@section('content')
    <main class="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <section class="max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-sans font-extrabold mb-4 text-center tracking-tight">
                Apa Kata Pelanggan Kami?
            </h1>
            <p class="text-lg mb-12 text-center">
                Lihat ulasan dan pengalaman mereka yang telah menggunakan layanan llafloristkediri.
            </p>

            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                @foreach ($testimonials as $testimony)
                    <x-testimony-card
                        :customer_name="$testimony['customer_name']"
                        :customer_status="$testimony['customer_status']"
                        :rating="$testimony['rating']"
                        :review="$testimony['review']"
                    />
                @endforeach
            </div>

            {{ $testimonials->links('vendor.pagination.tailwind') }}
        </section>
    </main>
@endsection
