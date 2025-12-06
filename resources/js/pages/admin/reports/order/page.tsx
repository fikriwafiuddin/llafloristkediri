import StatCard from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/utils';
import { index, order } from '@/routes/reports';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    AlertCircleIcon,
    BanknoteIcon,
    BookOpen,
    CircleCheckIcon,
    CircleXIcon,
    DownloadIcon,
} from 'lucide-react';
import FiltersSection from './FiltersSection';
import OrderChart from './OrderChart';
import PaymentStatusChart from './PaymentStatusChart';
import ShippingMethodChart from './ShippingMethodChart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: index().url,
    },
    {
        title: 'Pesanan',
        href: order().url,
    },
];

type ReportOrderPageProps = {
    summary: {
        totalOrders: number;
        totalCompleted: number;
        totalCanceled: number;
        totalProcess: number;
        totalLate: number;
        totalRevenue: number;
    };
    orderChart: {
        data: string;
        order: number;
    }[];
    shippingMethodChart: {
        shipping_method: string;
        orders: number;
        fill: string;
    }[];
    paymentStatusChart: {
        is_paid: string;
        orders: number;
        fill: string;
    }[];
    filters: {
        year: string;
        month: string;
    };
};

function ReportOrderPage({
    summary,
    orderChart,
    shippingMethodChart,
    paymentStatusChart,
    filters,
}: ReportOrderPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Produk" />
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-semibold">Laporan Pesanan</h2>

                <FiltersSection filters={filters} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Pesanan"
                        value={summary.totalOrders}
                        icon={BookOpen}
                    />
                    <StatCard
                        title="Telat"
                        value={summary.totalLate}
                        icon={AlertCircleIcon}
                    />
                    <StatCard
                        title="Selesai"
                        value={summary.totalCompleted}
                        icon={CircleCheckIcon}
                    />
                    <StatCard
                        title="Dibatalkan"
                        value={summary.totalCanceled}
                        icon={CircleXIcon}
                    />
                </div>
                <Card className="transition-transform hover:translate-y-[-2px]">
                    <CardContent>
                        <div>
                            <div>
                                <div className="flex w-full items-start justify-between">
                                    <h3 className="text-sm font-medium">
                                        Total Pendapatan
                                    </h3>
                                    <div>
                                        <BanknoteIcon />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-baseline">
                                    <p className="font-semibold break-words">
                                        {formatCurrency(summary.totalRevenue)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button>
                        Unduh Data Produk <DownloadIcon />
                    </Button>
                </div>

                <OrderChart chartData={orderChart} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <ShippingMethodChart
                        shippingMethodChart={shippingMethodChart}
                    />
                    <PaymentStatusChart
                        paymentStatusChart={paymentStatusChart}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

export default ReportOrderPage;
