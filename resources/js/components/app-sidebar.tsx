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
import cashTransactions from '@/routes/cash-transactions';
import categories from '@/routes/categories';
import materials from '@/routes/materials';
import orders from '@/routes/orders';
import products from '@/routes/products';
import schedules from '@/routes/schedules';
import testimonials from '@/routes/testimonials';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArchiveIcon,
    BookOpen,
    CalendarDaysIcon,
    FlowerIcon,
    FolderIcon,
    LayoutGrid,
    NotebookIcon,
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
        title: 'Jadwal',
        href: schedules.index(),
        icon: CalendarDaysIcon,
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
        title: 'Pesanan',
        href: orders.index(),
        icon: BookOpen,
    },
    {
        title: 'POS',
        href: orders.pos(),
        icon: TouchpadIcon,
    },
    {
        title: 'Kas',
        href: cashTransactions.index(),
        icon: NotebookIcon,
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
