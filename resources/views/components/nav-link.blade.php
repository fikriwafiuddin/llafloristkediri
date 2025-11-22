@props(['active' => false])

<a 
    {{ $attributes }}
    class="{{ $active ? 'text-primary' : 'hover:text-primary' }}  text-sm font-medium text-foreground transition-colors"
    aria-current="{{ $active }}"
>
    {{ $slot }}
</a>