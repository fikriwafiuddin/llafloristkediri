@props([
    'id' => 'select-' . uniqid(),
    'placeholder' => 'Pilih Opsi...',
    'options' => [], // Array asosiatif: ['value' => 'Label Tampilan']
    'name' => '',
    'default' => null, // Nilai default yang dipilih
])

<div x-data="{ open: false, selectedValue: '{{ $default }}', selectedLabel: '{{ $placeholder }}' }" 
     @click.outside="open = false" 
     class="relative w-full"
>
    
    <input type="hidden" name="{{ $name }}" :value="selectedValue">

    <button
        @click="open = !open"
        type="button"
        :aria-expanded="open"
        aria-haspopup="listbox"
        class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id="{{ $id }}"
    >
        <span x-text="selectedLabel" class="truncate"></span>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-4 w-4 opacity-50">
            <path d="m6 9 6 6 6-6"></path>
        </svg>
    </button>

    <div
        x-show="open"
        x-transition:enter="transition ease-out duration-100"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-lg overflow-auto max-h-60"
        style="display: none;"
    >
        <ul role="listbox" class="p-1">
            @foreach ($options as $value => $label)
                <li
                    @click="selectedValue = '{{ $value }}'; selectedLabel = '{{ $label }}'; open = false;"
                    role="option"
                    :aria-selected="selectedValue === '{{ $value }}'"
                    class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    :class="{'font-semibold bg-accent': selectedValue === '{{ $value }}'}"
                >
                    {{ $label }}
                    <template x-if="selectedValue === '{{ $value }}'">
                        <svg class="absolute left-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </template>
                </li>
            @endforeach
        </ul>
    </div>
</div>