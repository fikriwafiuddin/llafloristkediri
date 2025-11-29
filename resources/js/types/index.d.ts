import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category_id: number;
    category?: {
        id: number;
        name: string;
    };
}

export interface Testimony {
    id: number;
    customer_name: string;
    rating: number;
    review: string;
    created_at: Date;
}

export interface Material {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export interface Order {
    id: number;
    customer_name: string;
    whatsapp_number: string;
    address: string;
    schedule: Date;
    total_amount: number;
    is_paid: boolean;
    shipping_method: 'delivery' | 'pickup';
    status: string;
    created_at: Date;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
