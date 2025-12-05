@props(['customer_name', 'rating', 'review', 'customer_status'])

<div class="p-6 rounded-xl shadow-lg border">
    <div class="flex items-center mb-4">
        @for ($i = 0; $i <= $rating; $i++)
            <span class="text-2xl mr-2 text-primary">
                ★
            </span>
        @endfor
    </div>
    <p class="italic mb-4">
        "{{ $review }}"
    </p>
    <div class="font-bold text-primary">
        {{ $customer_name }}
    </div>
    <div class="text-sm text-muted-foreground">
        {{ $customer_status }}
    </div>
</div>