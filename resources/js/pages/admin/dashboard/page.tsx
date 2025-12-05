import StatCard from '@/components/stat-card';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    BanknoteIcon,
    BookOpen,
    CalendarDaysIcon,
    FlowerIcon,
} from 'lucide-react';
import LatestOrder from './LatestOrder';
import LatestTransaction from './LatestTransaction';
import OrderChart from './OrderChart';
import TransactionChart from './TransactionChart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-4 p-4">
                <div className="grid gap-4 lg:grid-cols-4">
                    <StatCard
                        title="Jadwal hari ini"
                        value={5}
                        icon={CalendarDaysIcon}
                    />
                    <StatCard
                        title="Kas"
                        value={1000000}
                        icon={BanknoteIcon}
                        isCurrency
                    />
                    <StatCard
                        title="Total Produk"
                        value={20}
                        icon={FlowerIcon}
                    />
                    <StatCard title="Pesanan Baru" value={5} icon={BookOpen} />
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <TransactionChart />
                    <LatestTransaction />

                    <OrderChart />
                    <LatestOrder />
                </div>
            </div>
        </AppLayout>
    );
}
