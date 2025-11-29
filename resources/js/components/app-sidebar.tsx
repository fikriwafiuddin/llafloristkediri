import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import categories from '@/routes/categories';
import materials from '@/routes/materials';
import orders from '@/routes/orders';
import products from '@/routes/products';
import testimonials from '@/routes/testimonials';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArchiveIcon,
    BookOpen,
    FlowerIcon,
    Folder,
    FolderIcon,
    LayoutGrid,
    StarIcon,
    TouchpadIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Kategori',
        href: categories.index(),
        icon: FolderIcon,
    },
    {
        title: 'Produk',
        href: products.index(),
        icon: FlowerIcon,
    },
    {
        title: 'Testimoni',
        href: testimonials.index(),
        icon: StarIcon,
    },
    {
        title: 'Bahan',
        href: materials.index(),
        icon: ArchiveIcon,
    },
    {
        title: 'POS',
        href: orders.create(),
        icon: TouchpadIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
