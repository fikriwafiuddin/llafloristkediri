@props(['customer_name', 'rating', 'review'])

<div class="rounded-xl border bg-card text-card-foreground shadow group overflow-hidden card-hover">
    <div class="p-4 text-accent-foreground">
        <h2 class="font-semibold">{{ $customer_name }}</h2>

        <div class="flex">
            @for ($x = 0; $x <= $rating; $x++)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-5 text-yellow-500"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                    />
                </svg>
            @endfor
        </div>

        <div class="mt-3">
            <p class="text-sm">{{ $review }}</p>
        </div>
    </div>
</div>