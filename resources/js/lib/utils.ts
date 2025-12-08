import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function translateStatus(status: string): string {
    switch (status) {
        case 'process':
            return 'Diproses';
        case 'completed':
            return 'Selesai';
        case 'canceled':
            return 'Dibatalkan';
        default:
            return status;
    }
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(amount);
}

export function formatDate(dateString: string | Date): string {
    return format(dateString, 'dd MMMM yyyy HH:mm', {
        locale: id,
    });
}
