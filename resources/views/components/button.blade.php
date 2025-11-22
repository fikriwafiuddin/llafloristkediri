@props(['variant' => 'default', 'class' => ''])

@php
    $style;

    switch ($variant) {
        case 'destructive':
            $style = "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40";
            break;
        case 'outline':
            $style =  "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground";
            break;
        case 'secondary':
            $style = "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80";
            break;
        case 'ghost':
            $style = "hover:bg-accent hover:text-accent-foreground";
            break;
        case 'link':
            $style = "text-primary underline-offset-4 hover:underline";
            break;
        case 'success':
            $style = "bg-green-500 text-primary-foreground shadow-xs hover:bg-green-600";
            break;
        default:
            $style = "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90";
            break;
    }
@endphp

<div>
    <button {{ $attributes }} class="{{ $style }} {{ $class }} inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3">
        {{ $slot }}
    </button>
</div>