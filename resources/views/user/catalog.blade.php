@extends('layout.user-layout')

@section('title', 'Katalog')

@section('content')
<div class="mx-auto px-4 py-8 space-y-6">
    <div class="">
        <h1 class="font-playfair-display text-4xl font-bold">Katalog Produk</h1>
        <p class="text-muted-forground">Temukan rangkaian bunga sempurna untuk setiap momen spesial Anda</p>
    </div>

    {{-- Filters --}}
    <div class="rounded-xl border bg-card text-card-foreground shadow p-6 mb-8">
        <form action="{{ route('user.catalog.index') }}" method="get">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="relative lg:col-span-2 flex gap-2">
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
                        class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                    >
                        <path d="m21 21-4.34-4.34"></path>
                        <circle
                            cx="11"
                            cy="11"
                            r="8"
                        ></circle>
                    </svg>
                    <input
                        name="search"
                        id="search"
                        class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10"
                        placeholder="Cari bunga..."
                        data-testid="search-input"
                        value="{{ request('search') }}"
                    >
                    <x-button type="submit">Cari</x-button>
                </div>
                    
                <div class="relative h-min">
                    <select
                        name="category"
                        id="category"
                        class="flex appearance-none h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        style="background-image: none;"
                        onchange="this.form.submit()"
                    >
                        <option value="" @selected(request('category') == '')>Semua</option>
                        @foreach ($categories as $category)
                            <option
                                value="{{ $category['id'] }}"
                                @selected(request('category') == $category['id'])
                            >
                                {{ $category['name'] }}
                            </option>
                        @endforeach
                    </select>

                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                            class="lucide lucide-chevron-down h-4 w-4 opacity-50"
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                </div>
            </div>
                <div class="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t">
                    <div class="flex items-center gap-2">
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
                            class="lucide lucide-sliders-horizontal h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                        >
                            <line x1="21" x2="14" y1="4" y2="4"></line>
                            <line x1="10" x2="3" y1="4" y2="4"></line>
                            <line x1="21" x2="12" y1="12" y2="12"></line>
                            <line x1="8" x2="3" y1="12" y2="12"></line>
                            <line x1="21" x2="16" y1="20" y2="20"></line>
                            <line x1="12" x2="3" y1="20" y2="20"></line>
                            <line x1="14" x2="14" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="10" y2="14"></line>
                            <line x1="16" x2="16" y1="18" y2="22"></line>
                        </svg>

                        <div class="relative h-min">
                            <select
                                name="price_sort"
                                id="price_sort"
                                class="flex w-[180px] appearance-none h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                style="background-image: none;"
                                onchange="this.form.submit()"
                            >
                                <option
                                    value=""
                                    @selected(request('price_sort') == "")
                                >
                                    Default
                                </option>
                                <option
                                    value="asc"
                                    @selected(request('price_sort') == "asc")
                                >
                                    Harga Terendah
                                </option>
                                <option
                                    value="desc"
                                    @selected(request('price_sort') == "desc")
                                >
                                    Harga Teratas
                                </option>
                            </select>

                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                                    class="lucide lucide-chevron-down h-4 w-4 opacity-50"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                <div class="flex items-center gap-2"></div>
            </div>
        </form>
    </div>

    {{-- Products --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @foreach ($products as $product)
            <x-product-card
                :id="$product['id']"
                :image="$product['image']"
                :name="$product['name']"
                :price="$product['price']"
                :description="$product['description']"
                :category="$product['category']['name']"
            />
        @endforeach
    </div>

    @if (count($products) == 0)
        <h2 class="text-muted text-4xl text-center py-10">Produk Kosong</h2>
    @endif

    {{-- Pagination --}}
    {{ $products->links('vendor.pagination.tailwind') }}
</div>
@endsection
