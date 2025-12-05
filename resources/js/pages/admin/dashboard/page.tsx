import StatCard from '@/components/stat-card';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { CashTransaction, Material, Order, type BreadcrumbItem } from '@/types';
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
import OutOfStockMaterials from './OutOfStockMaterials';
import TopProducts from './TopProducts';
import TransactionChart from './TransactionChart';
import { CashTransactionChartData, OrderChartData, TopProduct } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type DashboardProps = {
    statistics: {
        totalSchedules: number;
        totalBalance: number;
        totalProducts: number;
        totalLatestOrders: number;
    };
    ordersChartData: OrderChartData[];
    latestOrders: Order[];
    transactionChartData: CashTransactionChartData[];
    latestTransactions: CashTransaction[];
    topProducts: TopProduct[];
    outOfStockMaterials: Material[];
};

export default function Dashboard({
    statistics,
    ordersChartData,
    latestOrders,
    transactionChartData,
    latestTransactions,
    topProducts,
    outOfStockMaterials,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-4 p-4">
                <div className="grid gap-4 lg:grid-cols-4">
                    <StatCard
                        title="Jadwal hari ini"
                        value={statistics.totalSchedules}
                        icon={CalendarDaysIcon}
                    />
                    <StatCard
                        title="Kas"
                        value={statistics.totalBalance}
                        icon={BanknoteIcon}
                        isCurrency
                    />
                    <StatCard
                        title="Total Produk"
                        value={statistics.totalProducts}
                        icon={FlowerIcon}
                    />
                    <StatCard
                        title="Pesanan Baru"
                        value={statistics.totalLatestOrders}
                        icon={BookOpen}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <TransactionChart chartData={transactionChartData} />
                    <LatestTransaction latesTransactions={latestTransactions} />

                    <OrderChart chartData={ordersChartData} />
                    <LatestOrder latestOrders={latestOrders} />
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <TopProducts topProducts={topProducts} />
                    <OutOfStockMaterials materials={outOfStockMaterials} />
                </div>
            </div>
        </AppLayout>
    );
}
